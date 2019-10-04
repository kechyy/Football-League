import { Router } from 'express';
import {
  createLeague, DeleteLeague, updateLeague, viewLeague,
} from '../controller/LeagueController';
import AdminCheck from '../middlewares/permission.middleware';
import { leagueValidate } from '../middlewares/LeagueValidation';
import { tokenVerifier } from '../middlewares/authorize';

const leagueRoute = Router();

leagueRoute.post('/', tokenVerifier, AdminCheck, leagueValidate, createLeague);
leagueRoute.delete('/:id/delete', tokenVerifier, AdminCheck, DeleteLeague);
leagueRoute.patch('/:id/edit', tokenVerifier, AdminCheck, leagueValidate, updateLeague);
leagueRoute.get('/', tokenVerifier, viewLeague);

export default leagueRoute;
