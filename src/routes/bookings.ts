import express, { Router, Request, Response } from 'express';
import { Bookings } from '../models/EMBooking';
import { logger } from '../services/ESLogger';
import { Users } from '../models/EMUser';
import { Rooms } from '../models/EMRoom';

import  mongoose from 'mongoose'
// import { ObjectId } from 'mongoose';



const router: Router = express.Router();


// GET /bookings : Get a list of all bookings.
router.get('/', async (req, res) => {
    try {
      const bookings = await Bookings.find();
      res.json(bookings);
    } catch (error) {
      console.error(`Error retrieving bookings: ${error}`);
      res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
});


// PUT /bookings/:id
router.put('/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { user_id, room_id, date_and_time, number_of_players, list_of_participants} = req.body as IBooking;
  
      // Check if the booking exists
      const booking = await Bookings.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      // Update the booking details
      booking.user_id = user_id;
      booking.room_id = room_id;
      booking.date_and_time = date_and_time;
      booking.number_of_players = number_of_players;
      booking.list_of_participants = list_of_participants;
      
      // Save the updated booking
      await booking.save();
  
      res.json(booking);
    } catch (error) {
      console.error(`Error updating booking: ${error}`);
      res.status(500).json({ error: 'Failed to update booking' });
    }
});



// GET /bookings/user_id: Get a list of all bookings for the logged-in user.
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        // const db = mongoose.connection
        // console.log('db',db )
        // db.createView()
        

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
let doc = await Bookings.aggregate([

  
  {$match:{user_id: {$eq: new mongoose.Types.ObjectId(userId)}}},
  {$lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'users' }},
  {$lookup: { from: 'rooms', localField: 'room_id', foreignField: '_id', as: 'rooms' }},
  // {$project: {
  //   number_of_players: 1,
  //   userMail: "$users.mail"
  // }},
  // { $unwind: "$userMail" }
])
        // const bookings = await Bookings.find({ user: userId });

        res.json(doc);
    } catch (error) {
        logger.error(`Error retrieving bookings: ${error}`);
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
});


// POST /bookings: Create a new booking.
router.post('/', async (req: Request, res: Response) => {
    try {
      const { user_id, room_id, date_and_time, number_of_players, list_of_participants } = req.body as IBooking;
  
      if (!user_id || !room_id || !date_and_time || !list_of_participants) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await Users.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const room = await Rooms.findById(room_id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      const booking = await Bookings.create({
        user_id,
        room_id,
        date_and_time,
        number_of_players,
        list_of_participants
      });
  
      res.json({ message: 'Booking created successfully', booking });
    } catch (error) {
      console.error(`Error creating booking: ${error}`);
      res.status(500).json({ error: 'Failed to create booking' });
    }
});



// DELETE /bookings/:id: Delete a booking.
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.id;
  
      await Bookings.findByIdAndDelete(bookingId);
  
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      logger.error(`Error deleting booking: ${error}`);
      res.status(500).json({ error: 'Failed to delete booking' });
    }
});

export { router as bookings_routes };