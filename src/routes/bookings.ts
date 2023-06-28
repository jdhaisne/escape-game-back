import express, { Router, Request, Response } from 'express';
import { Bookings } from '../models/EMBooking';
import { logger } from '../services/ESLogger';


const router: Router = express.Router();

// GET /bookings/user_id: Get a list of all bookings for the logged-in user.
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const bookings = await Bookings.find({ user: userId });

        res.json(bookings);
    } catch (error) {
        logger.error(`Error retrieving bookings: ${error}`);
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
});

export { router as bookings_routes };