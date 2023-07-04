import { Schema, model } from 'mongoose';
import { IRoom } from "../interfaces/IRoom";

const roomsShema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    age_limit: { type: Number, required: true },
    slots: { type: Number, required: true },
});
  
export const Rooms = model<IRoom>('Room', roomsShema);