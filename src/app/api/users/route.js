import { connectToDatabase } from '../../../libs/db';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(req) {
  await connectToDatabase();
  const { name, email } = await req.json();
  const newUser = new User({ name, email });
  await newUser.save();
  return NextResponse.json(newUser, { status: 201 });
}
