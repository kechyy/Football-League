import { validateTeam } from './schema-Validation';
import League from '../db/models/leagues';

class TeamValidation {
  static async teamValidate(req, res, next) {
    try {
      const { team, country } = req.body;
      const { league } = req.params;
      const teamCheck = await validateTeam({ team, country, league });
      if (teamCheck) {
        req.body.team = teamCheck.team;
        req.body.country = teamCheck.country;
      }
      const leagueExist = await League.findOne({ _id: league });
      if (leagueExist === null) {
        return res.status(404).json({ status: 404, message: 'League ID does not exist' });
      }
      return next();
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}
const { teamValidate } = TeamValidation;
export { teamValidate };
