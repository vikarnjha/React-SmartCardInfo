import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardNumber: String,
  cardExpiry: String,
  cardName: String,
  cardSecurity: String,
  cardType: String,
  cardNetwork: String,
  cardBrand: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cards: [cardSchema],
});

const userModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default userModel;
