import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/ConnectToDB";
import Enrollment from "@/models/EnrollmentSchema";
import User from "@/models/UserSchema";

export async function POST(req: Request) {
  try {
    const { selectedClass, experience, message, userId } = await req.json();
    await connectToDB();

    if (!selectedClass || !experience) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json({ message: "Missing user Id" }, { status: 404 });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({ userId, class: selectedClass });
    if (existing) {
      return NextResponse.json(
        { message: "You are already enrolled in this class" },
        { status: 400 }
      );
    }

    await Enrollment.create({
      class: selectedClass,
      message,
      experience,
      userId,
    });

    // Update user's classes (without duplicates)
    await User.findByIdAndUpdate(userId, {
      $addToSet: { classes: selectedClass },
    });

    return NextResponse.json(
      { message: "Enrollment successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enrollement error:", error);
    return NextResponse.json(
      { message: "Something went wrong..." },
      { status: 500 }
    );
  }
}
