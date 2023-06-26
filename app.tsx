const express = require("express");
import cors from "cors";
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require("mongoose");

async function main() {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://juliendhaisne:6VD7tkGdJD0ruxvg@cluster0.jl47jax.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log(err);
  }

  // console.log(con);

  const userSchema = new mongoose.Schema({
    name: String,

    password: String,
  });
  const Users = mongoose.model("user", userSchema);
  // await userModel.create({ name: "jd" });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  app.use(cors());
  app.get("/", async (req, res) => {
    res.send("Hello World!");
  });

  app
    .route("/users")
    .get(async (req, res) => {
      try {
        const user = await Users.find({}).exec();
        console.log(user);
        res.send(user);
      } catch (error) {}
    })
    .post(urlencodedParser, async (req, res) => {
      console.log(req.body.password);
      await bcrypt.hash(
        req.body.password,
        saltRounds,
        async function (err, hash) {
          try {
            await Users.create({ name: req.body.name, password: hash });
            res.send("done");
          } catch (err) {
            console.log(err);
          }
        }
      );

      console.log(req.body);
    });

  app.route("/users/login").post(urlencodedParser, async (req, res) => {
    try {
      const user = await Users.findOne({ name: req.body.name }).exec();
      console.log(user.password);
      await bcrypt.compare(
        req.body.password,
        user.password,
        function (err, result) {
          if (result) res.send("logged");
          else res.send("not logged");
        }
      );
    } catch (err) {
      console.log(err);
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

try {
  main();
} catch (error) {
  console.log(error);
}
