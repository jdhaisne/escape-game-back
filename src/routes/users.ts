
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
    logger.debug(req.params.id)
    res.send({message : "MESSAGE"})
}); 
  

// POST ALLOW THE USER TO DELETE HIS ACCOUNT : 
router.get('/:id/delete-my-account', async (req: Request, res: Response) => {
    logger.debug(req.params.id)
    res.send({message : "ACCOUNT DELETED"})
}); 
  

export { router as users_routes };