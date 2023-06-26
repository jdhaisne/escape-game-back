import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://juliendhaisne:6VD7tkGdJD0ruxvg@cluster0.jl47jax.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log(err);
  }

  const userSchema = new mongoose.Schema({
    name: String,
    password: String,
  });
  const Users = mongoose.model("user", userSchema);

  app.use(cors());

  
  app.get("/", async (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app
    .route("/users")
    .get(async (req: Request, res: Response) => {
      try {
        const users = await Users.find({}).exec();
        console.log(users);
        res.send(users);
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    })
    .post(urlencodedParser, async (req: Request, res: Response) => {
      console.log(req.body.password);
      try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        await Users.create({ name: req.body.name, password: hash });
        res.send("done");
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

  app.route("/users/login").post(urlencodedParser, async (req: Request, res: Response) => {
    try {
      const user = await Users.findOne({ name: req.body.name }).exec();
      console.log(user?.password);
      user?.password && bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) res.send("logged");
        else res.send("not logged");
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
}

try {
  main();
} catch (error) {
  console.log(error);
}