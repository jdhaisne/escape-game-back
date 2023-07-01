
import express, { Router, Request, Response } from 'express';
import { Users } from '../models/EMUser';
import { logger } from '../services/ESLogger';



const router: Router = express.Router();


// GET ALL USERS DATA : 
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await Users.find({}).exec();
    logger.info(users)
    res.send(users);
  }
  catch (error: any) {
    logger.error(error)
    res.status(500).send("Internal Server Error");
  }
});


// GET A SPECIFIC USER DATA : 
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.send(user);
  } catch (error: any) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// POST ALLOW THE USER TO DELETE HIS ACCOUNT : 
router.delete('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    // Delete the user
    const result = await Users.deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Account deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    logger.error(`Error deleting user: ${error}`);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export { router as users_routes };