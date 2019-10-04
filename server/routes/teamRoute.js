import { Router } from 'express';
import {
  createTeam, DeleteTeam, updateTeam, viewTeam, getAllTeams, getTeams,
} from '../controller/TeamController';
import AdminCheck from '../middlewares/permission.middleware';
import { teamValidate } from '../middlewares/TeamValidation';
import { tokenVerifier } from '../middlewares/authorize';

const teamRoute = Router();

teamRoute.post('/:league', tokenVerifier, AdminCheck, teamValidate, createTeam);
teamRoute.delete('/:id/:league', tokenVerifier, AdminCheck, DeleteTeam);
teamRoute.patch('/:id/edit', tokenVerifier, AdminCheck, teamValidate, updateTeam);
teamRoute.get('/:teamId', tokenVerifier, AdminCheck, viewTeam);
teamRoute.get('/', tokenVerifier, getAllTeams);
teamRoute.get('/:leagueId/league', tokenVerifier, getTeams);

export default teamRoute;
