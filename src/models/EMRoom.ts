import { Schema, model } from 'mongoose';
import { IRoom } from "../interfaces/IRoom";

const roomsShema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    age_limit: { type: Number, required: true },
    slots: { type: Number, required: true },
    availability: {
        monday: {
            morning: { type: Boolean, default: true },
            afternoon: { type: Boolean, default: true }
        },
        tuesday: {
            morning: { type: Boolean, default: true },
            afternoon: { type: Boolean, default: true }
        },
        wednesday: {
            morning: { type: Boolean, default: true },
            afternoon: { type: Boolean, default: true }
        },
        thursday: {
            morning: { type: Boolean, default: true },
            afternoon: { type: Boolean, default: true }
        },
        friday: {
            morning: { type: Boolean, default: true },
            afternoon: { type: Boolean, default: true }
        },
        saturday: {
            morning: { type: Boolean, default: true },
            afternoon: { type: Boolean, default: true }
        }
    }
});


export const Rooms = model<IRoom>('Room', roomsShema);