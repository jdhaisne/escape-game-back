import { Bookings } from "../models/EMBooking"
import { Rooms } from "../models/EMRoom"
import { Users } from "../models/EMUser"

import { logger } from "../services/ESLogger"

export const seedBooking = async () => {
    let admin:any = {}
    let room:any = {}
    let bookingData:any = {}
    try {
        admin = await Users.findOne({email: 'admin@admin.com'}).exec()
    }catch(error) {
        logger.debug(`Error while gettign admin. ${error}`);
    }
          
    try {
         room = await Rooms.findOne({name: 'Room 1'}).exec()
    }catch(error) {
        logger.debug(`Error while getting Room1. ${error}`);
    }
        try {
        if(admin && room) {
             bookingData = [
            {
                user_id: admin._id,
                room_id: room._id,
                date_and_time: Date.now(),
                number_of_players: 2,
                list_of_participant: [
                    {
                        "firstname": "john",
                        "lastname": "doe",
                        "birthday": "07/09/1998",
                        "_id": "64a078e5f4714480c99fae18"
                      },
                      admin
                ]
            }
        ]
        }
        for (let booking of bookingData) {
            const existingBooking = await Bookings.findOne({user_id: {$eq: admin._id}, room_id: {$eq: room._id}})
            if(!existingBooking) {
                console.log(booking)
                const newBooking = new Bookings(booking);
                await newBooking.save();
                logger.debug(`Booking created: ${JSON.stringify(newBooking)}`);
            }
        }
        logger.debug('Seed of Booking done.');
    } catch (error) {
        logger.debug(`Error while seeding Booking. ${error}`);
    }
    
}