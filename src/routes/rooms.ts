import express, { Router, Request, Response } from 'express';
import { Rooms } from '../models/EMRoom';
import { logger } from '../services/ESLogger';


const router: Router = express.Router();


// GET ALL ROOMS DATA : 
router.get('/', async (req: Request, res: Response) => {
    try {
      const rooms = await Rooms.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
});


// GET SPECIFIC ROOM DATA : 
router.get('/:id', async (req: Request, res: Response) => {
    const roomId = req.params.id;
  
    try {
      const room = await Rooms.findById(roomId);
      
  
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ error: 'Room not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve room' });
    }
});

router.put('/:id', async (req: Request, res:Response) => {
  const roomId = req.params.id;
  try {
    let room = await Rooms.findById(roomId);
    if (room) {
      Object.assign(room, req.body)
      console.log(room,req.body)
      const updatedRoom = await room.save()
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

export { router as rooms_routes };