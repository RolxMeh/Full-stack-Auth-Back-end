import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

import Cards from "./models/dbCard.js";

const saltRounds = 10;

//App config
const app = express();
const port = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cors());

//DB config
const connect_url =
  "mongodb+srv://roland90:Ogeleayo90@cluster0.bxr5faj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connect_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API Endpoints
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(501).send(err);
    }
    Cards.create({ username: username, password: hash });
  });
});

app.post("/login", (req, res) => {
  const dbCardInput = req.body;

  Cards.find(dbCardInput, (err, data) => {
    if (err) {
      res.status(501).send(err);
    }

    if (data.length > 0) {
      res.status(200).send(data);
    } else {
      res.send({
        message: "User not found",
      });
    }
  });
});
//Listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
