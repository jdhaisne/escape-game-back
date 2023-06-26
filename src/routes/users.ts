
import express, { Router, Request, Response } from 'express';
import { Users } from '../models/EMUser';
import { logger } from '../services/ESLogger';
import bcrypt from "bcrypt";


const router: Router = express.Router();


// GET USERS : 
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await Users.find({}).exec();
        logger.info(users)
        res.send(users);
    } 
    catch (error : any) {
        logger.error(error)
        res.status(500).send("Internal Server Error");
    }
});


// PÖST USERS : 
router.post('/', async (req: Request, res: Response) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        await Users.create({ name: req.body.name, password: hash });
        logger.info(req.body.password);
        res.send("done");
    } catch (err : any) {
        logger.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// POST LOGIN:
router.post('/login', async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
      const user = await Users.findOne({ name }).exec();
  
      if (!user) {
        return res.status(401).send('User not found');
      }
  
      if (typeof password !== 'string') {
        return res.status(400).send('Invalid password');
      }
  
      if (!user.password) {
        return res.status(400).send('No password set for this user');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        return res.send('Logged in successfully');
      } else {
        return res.status(401).send('Incorrect password');
      }
    } catch (err: any) {
      logger.error(err);
      return res.status(500).send('Internal Server Error');
    }
});



export { router as users_routes };