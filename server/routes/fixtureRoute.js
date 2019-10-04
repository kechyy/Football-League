import { Router } from 'express';
import {
  createFixture, DeleteFixture, updateFixture, viewFixture,
} from '../controller/FixtureController';
import AdminCheck from '../middlewares/permission.middleware';
// import { FixtureValidate } from '../middlewares/TeamValidation';
import { tokenVerifier } from '../middlewares/authorize';

const fixtureRoute = Router();

fixtureRoute.post('/', tokenVerifier, AdminCheck, createFixture);
fixtureRoute.delete('/:id', tokenVerifier, AdminCheck, DeleteFixture);
fixtureRoute.patch('/:id', tokenVerifier, AdminCheck, updateFixture);
fixtureRoute.get('/', tokenVerifier, viewFixture);

export default fixtureRoute;
