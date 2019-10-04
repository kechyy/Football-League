import Joi from 'joi';

const firstname = Joi.string()
  .min(2)
  .required()
  .error(
    new Error('Your firstname is required and must be atleast minimum of 2 characters'),
  );
const lastname = Joi.string()
  .min(2)
  .required()
  .error(
    new Error(
      'Your lastname is required and must be atleast minimum of 2 characters',
    ),
  );
const email = Joi.string()
  .email()
  .regex(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  ).error(
    new Error('Wrong email format'),
  );
const phone = Joi.string()
  .required()
  .error(
    new Error('Phone number must be atleast 8'),
  );
const password = Joi.string()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required()
  .error(
    new Error('combination of text and number is required'),
  );
const comfirmPassword = Joi.any()
  .equal(Joi.ref('password'))
  .required()
  .error(
    new Error('Password not the same'),
  );
const team = Joi.string()
  .required()
  .error(
    new Error('Team field is required'),
  );
const league = Joi.string()
  .required()
  .error(
    new Error('League field is required'),
  );
const country = Joi.string()
  .required()
  .error(
    new Error('League country field is required'),
  );
const leagueId = Joi.string()
  .length(24)
  .error(
    new Error('Invalid league ID'),
  );

const signUpSchema = Joi.object().keys({
  firstname,
  lastname,
  email,
  phone,
  password,
  comfirmPassword,
}).with('password', 'comfirmPassword');

const signInSchema = Joi.object().keys({
  email,
  password,
});

const teamSchema = Joi.object().keys({
  team,
  country,
  league: leagueId,
});
const leagueSchema = Joi.object().keys({
  league,
});

const validateSignUp = (userInput) => {
  if (typeof userInput !== 'object') {
    return 'Can only accept object';
  }
  return Joi.validate(userInput, signUpSchema);
};
const validateSignIn = (userInput) => {
  if (typeof userInput !== 'object') {
    return 'Can only accept object';
  }
  return Joi.validate(userInput, signInSchema);
};
const validateTeam = (userInput) => {
  if (typeof userInput !== 'object') {
    return 'Can only accept object';
  }
  return Joi.validate(userInput, teamSchema);
};
const validateLeague = (userInput) => {
  if (typeof userInput !== 'object') {
    return 'Can only accept object';
  }
  return Joi.validate(userInput, leagueSchema);
};
export {
  validateSignUp, validateSignIn, validateTeam, validateLeague,
};
