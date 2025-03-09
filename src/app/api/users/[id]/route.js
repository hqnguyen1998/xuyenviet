import { connectToDatabase } from '../../../../libs/db';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * @description Update an existing user
 * @param {NextApiRequest} req - The request object
 * @param {Object} params - The route params
 * @param {string} params.id - The user id
 * @return {NextApiResponse} - The response object
 */
/******  f625e551-6789-46fc-9247-9fae044fccce  *******/ export async function PUT(
  req,
  { params }
) {
  await connectToDatabase();
  const { name, email } = await req.json();
  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { name, email },
    { new: true }
  );
  return NextResponse.json(updatedUser);
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'User deleted' }, { status: 204 });
}
