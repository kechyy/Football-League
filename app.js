import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  userRoute, teamRoute, leagueRoute, fixtureRoute,
} from './server/routes';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/teams', teamRoute);
app.use('/api/v1/leagues', leagueRoute);
app.use('/api/v1/fixtures', fixtureRoute);
app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found',
}));

export default app;

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
