const Joi = require('joi');
PASSWORD_SALT_ROUNDS = 10;

const SignUpRequestSchema = Joi.object().keys({
    firstName: Joi.string()
        .required()
        .min(2),
    lastName: Joi.string()
        .required()
        .min(2),
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required()
        .min(6),
});

const LoginUpRequestSchema = Joi.object().keys({
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string().required()
});

module.exports = {
    SignUpRequestSchema,
    LoginUpRequestSchema,
    PASSWORD_SALT_ROUNDS
}