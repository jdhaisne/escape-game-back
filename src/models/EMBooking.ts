import { Schema, model } from 'mongoose';
import { IBooking } from "../interfaces/IBooking";

const bookingsSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    room_id: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    date_and_time: { type: Number, required: true },
    number_of_players: { type: Number, required: true },
});

export const Bookings = model<IBooking>('Booking', bookingsSchema);