import { IRoom } from "../interfaces/IRoom";
import { Rooms } from "../models/EMRoom";
import { logger } from "../services/ESLogger";

export async function seedRooms(): Promise<void> {
  const roomData: IRoom[] = [
    { name: 'Salle 1', description: 'Description de la salle 1', age_limit: 18, slots: 10 },
    { name: 'Salle 2', description: 'Description de la salle 2', age_limit: 21, slots: 8 },
  ];

  try {
    for (const room of roomData) {
      const newRoom = new Rooms(room);
      await newRoom.save();
      logger.debug(`Salle créée : ${newRoom}`)
    }

    logger.debug(`Seed des salles terminé avec succès.`)
  } catch (error) {
    logger.error(`Erreur lors de la création des salles : ${error}`)
  }
}