import { IRoom } from "../interfaces/IRoom";
import { Rooms } from "../models/EMRoom";
import { logger } from "../services/ESLogger";

export async function seedRooms(): Promise<void> {
  const roomData: IRoom[] = [
    { name: 'Room 1', image : 'https://images.rtl.fr/~c/795v350/rtl/www/1342307-escape-game.jpg', description: 'Description room 1', age_limit: 18, slots: 10 },
    { name: 'Room 2', image : 'https://trappesmag.fr/sites/trappesmag/files/styles/contenu/public/image/2020-06/sherlock.jpg', description: 'Description room 2', age_limit: 21, slots: 8 },
  ];

  try {
    for (const room of roomData) {
      const existingRoom = await Rooms.findOne({ name: room.name }); // Check if the room already exists

      if (!existingRoom) {
        const newRoom = new Rooms(room);
        await newRoom.save();
        logger.debug(`Rooms created: ${JSON.stringify(newRoom)}`);
      }
    }

    logger.debug(`Seed of Rooms done.`);
  } catch (error) {
    logger.error(`Error while seeding Rooms: ${error}`);
  }
}