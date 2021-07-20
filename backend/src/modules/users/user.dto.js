import Joi from "joi";

const UserLoginSchema = {
    username: Joi.string().alphanum().min(3).max(32).required(),
    password: Joi.string().min(8).max(256).required()
}

const UserRegisterSchema = {
    ...UserLoginSchema,
    email: Joi.string().email().required()
}

const UserEditSchema = {
    username: Joi.string().alphanum().min(3).max(32),
    password: Joi.string().min(8).max(256),
    email: Joi.string().email(),
    streamTitle: Joi.string().min(1).max(256)
}

export const UserLoginDto = Joi.object().keys(UserLoginSchema);

export const UserRegisterDto = Joi.object().keys(UserRegisterSchema);

export const UserEditDto = Joi.object().keys(UserEditSchema);