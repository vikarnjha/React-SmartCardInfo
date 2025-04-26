import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardNumber: String,
  encryptedNumber: String, // from encryptCard().data
  iv: String, // from encryptCard().iv
  cardExpire: String,
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
  googleId: {
    type: String,
    unique: true,
  },
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
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetOTP: {
    type: String,
  },
  resetOTPExpiry: {
    type: Date,
  },
  cards: [cardSchema],
});

const userModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default userModel;
