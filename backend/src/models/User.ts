//Users model
import mongoose, { Schema, Document } from 'mongoose';

// Interface representing a document in MongoDB.
export interface IUser extends Document {
  id: string;
  email: string;
  createdAt?: Date;
  last_sign_in?: Date;
  role?: string;
  loginCount: number;
}

// Schema corresponding to the document interface.
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  id: { type: String, required: true, unique: true },
  createdAt: Date,
  last_sign_in: Date,
  role: String,
  loginCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});


export default mongoose.model<IUser>('User', UserSchema, 'user_data');
