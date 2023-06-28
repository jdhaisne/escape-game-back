import { Schema, model } from 'mongoose';
import { IUser } from "../interfaces/IUser";

const userSchema: Schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});
  
export const Users = model<IUser>('User', userSchema);