import db from './index';

const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = db.model('users', userSchema);
