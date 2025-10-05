import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/ConnectToDB";
import User from "@/models/UserSchema";

import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";



export async function GET(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectToDB();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const correctPassword = await bcrypt.compare(password, existUser.password);

    if (!correctPassword) {
      return NextResponse.json({ message: "Wrong password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successeful" }, { status: 200 });
  } catch (error) {}
}
