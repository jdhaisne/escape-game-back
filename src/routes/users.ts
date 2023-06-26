
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


// PÖST LOGIN : 
router.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({ name: req.body.name }).exec();
        user?.password && logger.info(user.password)
        user?.password && bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result) res.send("logged");
          else res.send("not logged");
        });
    } 
    catch (err : any) {
        logger.error(err)
        res.status(500).send("Internal Server Error");
    }
});

export { router as users_routes };