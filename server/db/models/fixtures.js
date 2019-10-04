import db from './index';

const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const fixtureSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  awayTeam: mongoose.Schema.Types.ObjectId,
  homeTeam: mongoose.Schema.Types.ObjectId,
  league: mongoose.Schema.Types.ObjectId,
  fixtureDate: 'Date',
  fixtureStatus: Boolean,
});

module.exports = db.model('fixtures', fixtureSchema);
