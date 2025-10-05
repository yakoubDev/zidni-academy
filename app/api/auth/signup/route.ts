import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/ConnectToDB";
import User from "@/models/UserSchema";


import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, gender, password } =
      await req.json();
    await connectToDB();

    if (!firstName || !lastName || !email || !phone || !gender || !password) {
      return NextResponse.json(
        { message: "Please fill out all fields." },
        { status: 400 }
      );
    }

    if (firstName.trim().length < 5) {
      return NextResponse.json(
        { message: "firstName must be at least 5 characters long." },
        { status: 400 }
      );
    }

    if (password.trim().length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    if (gender !== "Male" && gender !== "Female") {
      return NextResponse.json({ message: "Invalid gender." }, { status: 400 });
    }

    if (!/^\d{8,15}$/.test(phone)) {
      return NextResponse.json(
        { message: "Invalid phone number." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password: password,
      role: "student",
    });

    return NextResponse.json(
      { message: "User added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add user error:", error);
    return NextResponse.json(
      { message: "Something went wrong..." },
      { status: 500 }
    );
  }
}