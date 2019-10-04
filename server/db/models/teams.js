import db from './index';

const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    team: { type: String, unique: true },
    country: String,
    user: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);
export default teamSchema;
module.exports = db.model('teams', teamSchema);
