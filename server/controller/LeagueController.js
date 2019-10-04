import League from '../db/models/leagues';

const mongoose = require('mongoose');

class LeagueController {
  static async createLeague(req, res) {
    const { league } = req.body;
    try {
      const leagueExist = await League.findOne({ league });
      if (leagueExist) {
        return res.status(409).json({ status: 409, message: 'League already exist' });
      }
      const newLeague = await new League({
        _id: new mongoose.Types.ObjectId(),
        league,
      }).save();
      return res.status(201).json({
        status: 201,
        data: {
          league: newLeague.league,
          team: newLeague.team,
        },
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async DeleteLeague(req, res) {
    try {
      const { id } = req.params;
      const delLeague = await League.deleteOne({ _id: id });
      if (delLeague.deletedCount) {
        return res.status(200).json({ status: 200, message: 'League successfully deleted' });
      }
      return res.status(404).json({ status: 404, message: 'This league has been removed or does not exist' });
    } catch (err) {
      return res.json({ message: 'Not successful! Invalid league id' });
    }
  }

  static async updateLeague(req, res) {
    try {
      const { id } = req.params;
      const { league, country } = req.body;
      const leagueExist = await League.findOne({ league, country });
      if (leagueExist) {
        return res.status(409).json({ status: 409, message: 'League update already exist' });
      }
      const updateLeague = await League.findOneAndUpdate({ _id: id },
        { $set: { league, country } }, { new: true });
      if (updateLeague) {
        return res.status(200).json({
          status: 200,
          data: { leageu: updateLeague.league, country: updateLeague.country },
        });
      }
      return res.status(404).json({ status: 404, message: 'This league has been removed or does not exist' });
    } catch (err) {
      return res.json({ message: 'Not successful! Invalid league id' });
    }
  }

  static async viewLeague(req, res) {
    try {
      const leagueView = await League.find();
      if (leagueView) {
        return res.status(200).json({
          status: 200,
          data: leagueView,
        });
      }
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}
const {
  createLeague, DeleteLeague, updateLeague, viewLeague,
} = LeagueController;
export {
  createLeague, DeleteLeague, updateLeague, viewLeague,
};
