import { connectToDatabase } from '../../../../libs/db';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';


export async function PUT(req, {params}) {
  const { zaloName, ingameName } = await req.json();
  
  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { zaloName, ingameName },
    { new: true }
  );
  return NextResponse.json(updatedUser);

}



export async function DELETE(req, { params }) {
  await connectToDatabase();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'User deleted' }, { status: 204 });
}
