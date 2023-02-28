import joi from 'joi';

const SigninSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default SigninSchema;