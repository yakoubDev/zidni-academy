import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/ConnectToDB";
import Enrollement from "@/models/EnrollementSchema";

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

    await Enrollement.create({ class: selectedClass, experience, userId });

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
