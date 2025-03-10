import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    zaloName: { type: String, required: true },
    ingameName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
