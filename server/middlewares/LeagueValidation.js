import { validateLeague } from './schema-Validation';

class LeagueValidation {
  static async leagueValidate(req, res, next) {
    try {
      const { league, country } = req.body;
      const leagueCheck = await validateLeague({ league });
      if (leagueCheck) {
        req.body.league = leagueCheck.league;
      }
      return next();
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}
const { leagueValidate } = LeagueValidation;
export { leagueValidate };
