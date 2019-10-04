import Team from '../db/models/teams';
import League from '../db/models/leagues';

const mongoose = require('mongoose');

class TeamController {
  static async createTeam(req, res) {
    const { team, country } = req.body;
    const { league } = req.params;
    try {
      const teamExist = await Team.findOne({ team, country });
      if (teamExist) {
        return res.status(409).json({ status: 409, message: 'Team already exist' });
      }
      const newTeam = await new Team({
        _id: new mongoose.Types.ObjectId(),
        team,
        country,
        user: req.userInfo.id,
      }).save();
      if (newTeam) {
        await League.findByIdAndUpdate({ _id: league }, { $addToSet: { team: newTeam._id } });
        return res.status(201).json({
          status: 201,
          data: newTeam,
        });
      }
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  static async DeleteTeam(req, res) {
    try {
      const { id, league } = req.params;
      const delTeam = await Team.deleteOne({ _id: id });
      if (delTeam.deletedCount) {
        await League.findByIdAndUpdate(
          { _id: league },
          { $pull: { team: { $in: [id] } } },
        );
        return res.status(200).json({ status: 200, message: 'Team successfully deleted' });
      }
      return res.status(404).json({ status: 404, message: 'This team has been removed or does not exist' });
    } catch (err) {
      return res.json({ message: 'Not successful! Invalid team id' });
    }
  }

  static async updateTeam(req, res) {
    try {
      const { id } = req.params;
      const { team, country, league } = req.body;
      const updateTeam = await Team.findOneAndUpdate({ _id: id }, { $set: { team, country } }, { new: true });
      if (updateTeam) {
        await League.findByIdAndUpdate({ _id: league }, { $addToSet: { team: updateTeam._id } });
        return res.status(200).json({ status: 200, data: updateTeam });
      }
      return res.status(404).json({ status: 404, message: 'This team has been removed or does not exist' });
    } catch (err) {
      return res.json({ message: 'Not successful! Invalid team id' });
    }
  }

  static async getAllTeams(req, res) {
    try {
      const teamView = await Team.find({}).populate('league').select('team, country, league');
      if (teamView) {
        return res.status(200).json({ status: 200, data: teamView });
      }
      return res.status(404).json({ status: 404, message: 'No team found' });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  static async viewTeam(req, res) {
    const { teamId } = req.params;
    try {
      const teamView = await Team.find({ _id: teamId }).populate('league').select('team country league');
      if (teamView) {
        return res.status(200).json({ status: 200, data: teamView });
      }
      return res.status(404).json({ status: 404, message: 'No team found' });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }

  static async getTeams(req, res) {
    const { leagueId } = req.params;
    try {
      const teamView = await League.find({ _id: leagueId }).populate('team').select('league team');
      if (teamView) {
        return res.status(200).json({ status: 200, data: teamView });
      }
      return res.status(404).json({ status: 404, message: 'No team found' });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}
const {
  createTeam, DeleteTeam, updateTeam, viewTeam, getAllTeams, getTeams,
} = TeamController;
export {
  createTeam, DeleteTeam, updateTeam, viewTeam, getAllTeams, getTeams,
};
