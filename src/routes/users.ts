
import express, { Router, Request, Response } from 'express';
import { Users } from '../models/EMUser';
import { logger } from '../services/ESLogger';
import bcrypt from "bcrypt";
import validator from 'validator';
import { IUser } from '../interfaces/IUser_data';
import { IValidationRule } from '../interfaces/IValidation';


const router: Router = express.Router();


// GET USERS : 
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


// POST USERS : 
router.post('/', async (req: Request, res: Response) => {
  const saltRounds = 10;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

  const requiredFields = ['firstname', 'lastname', 'email', 'password', 'birthday'];
  const missingFields = requiredFields.filter(field => !(field in req.body));

  if (missingFields.length > 0 ) {
    const missingFieldsMessage = missingFields.join(', ');
    const errorMessage = `Missing fields: ${missingFieldsMessage}`;
    return res.status(400).json({ message: errorMessage });
  }

  let hash;
  try {
    hash = await bcrypt.hash(req.body.password, saltRounds);
  } catch (error) {
    logger.error(`Error while hashing password: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  const rules: IValidationRule[] = [
    { condition: validator.isEmail(req.body.email), message: "Please enter a valid email" },
    { condition: validator.isLength(req.body.firstname, { min: 2, max: 50 }) && validator.isLength(req.body.lastname, { min: 2, max: 50 }), message: "Names should have at least 2 characters and a maximum of 50 characters" },
    { condition: validator.matches(req.body.password, passwordRegex), message: "Your password should contain special characters, at least one uppercase letter, and should be between 6 and 20 characters long" },
    { condition: validator.isDate(req.body.birthday, { format: 'DD/MM/YYYY' }), message: "Please enter a valid date of birth in the format DD/MM/YYYY" }
  ];

  
  const validationErrors = rules.filter(rule => !rule.condition).map(rule => rule.message);

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: validationErrors.join(', ') });
  }

  const user: IUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hash,
    email: req.body.email,
    birthday: req.body.birthday,
    isAdmin: false,
  };

  try {
    await Users.create(user);
    logger.debug(`User created: ${user}`)
    res.json({ message: "done" });
  } catch (error) {
    logger.error(`Error while creating user: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// POST LOGIN:
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).exec();

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
  } catch (error: any) {
    logger.error(`Error while logging in: ${error}`)
    res.status(500).send('Internal Server Error' + error);
  }
});

export { router as users_routes };