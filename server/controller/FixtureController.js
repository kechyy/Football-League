import Fixture from '../db/models/fixtures';

const mongoose = require('mongoose');

class FixtureController {
  static async createFixture(req, res) {
    const {
      homeTeam, awayTeam, league, fixtureDate,
    } = req.body;
    try {
      const fixtureExist = await Fixture.findOne({
        homeTeam, awayTeam, league, fixtureDate,
      });
      if (fixtureExist) {
        return res.status(409).json({ status: 409, message: 'Fixture already exist' });
      }
      const newFixture = await new Fixture({
        _id: new mongoose.Types.ObjectId(),
        homeTeam,
        awayTeam,
        league,
        fixtureDate,
        fixtureStatus: false,
      }).save();
      return res.status(201).json({
        status: 201,
        data: {
          homeTeam: newFixture.homeTeam,
          awayTeam: newFixture.awayTeam,
          league: newFixture.league,
          fixtureDate: newFixture.fixtureDate,
        },
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async DeleteFixture(req, res) {
    try {
      const { id } = req.params;
      const delFixture = await Fixture.deleteOne({ _id: id });
      if (delFixture.deletedCount) {
        return res.status(200).json({ status: 200, message: 'Fixture successfully deleted' });
      }
      return res.status(404).json({ status: 404, message: 'This Fixture has been removed or does not exist' });
    } catch (err) {
      return res.json({ message: 'Not successful! Invalid Fixture id' });
    }
  }

  static async updateFixture(req, res) {
    try {
      const { id } = req.params;
      const {
        homeTeam, awayTeam, league, fixtureDate, fixtureStatus,
      } = req.body;
      const updateFixture = await Fixture.findOneAndUpdate({ _id: id },
        {
          $set: {
            homeTeam, awayTeam, league, fixtureDate, fixtureStatus,
          },
        }, { new: true });
      if (updateFixture) {
        return res.status(200).json({ status: 200, data: updateFixture });
      }
      return res.status(404).json({ status: 404, message: 'This fixture has been removed or does not exist' });
    } catch (err) {
      return res.json({ message: 'Not successful! Invalid fixture id' });
    }
  }

  static async viewFixture(req, res) {
    try {
      const fixtureView = await Fixture.find();
      if (fixtureView) {
        return res.status(200).json({ status: 200, data: fixtureView });
      }
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}
const {
  createFixture, DeleteFixture, updateFixture, viewFixture,
} = FixtureController;
export {
  createFixture, DeleteFixture, updateFixture, viewFixture,
};
