import db from './index';
import teamSchema from './teams';

const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    league: String,
    team:
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
      }],
  },
  { timestamps: true },
);

module.exports = db.model('leagues', leagueSchema);
