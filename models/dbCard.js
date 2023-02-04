import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  username: String,
  password: String,
});

const Cards = mongoose.model("Cards", cardSchema);

export default Cards;
