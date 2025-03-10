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
  const { zaloName, ingameName } = await req.json();
  const newUser = new User({ zaloName, ingameName });
  await newUser.save();
  return NextResponse.json(newUser, { status: 201 });
}
