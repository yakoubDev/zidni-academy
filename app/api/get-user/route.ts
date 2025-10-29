import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/ConnectToDB';
import User from '@/models/UserSchema';
const jwt = require('jsonwebtoken');

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    await connectToDB();
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    // Return only necessary fields (secure and clean)
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      classes: user.classes
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (err) {
    console.error("Token verification error:", err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
