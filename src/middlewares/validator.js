import Joi from 'joi';

export const authSchemas = {
    register: Joi.object({
        name: Joi.string().trim().min(2).required().messages({
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email format',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(8).required().messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required'
        })
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};

export const postSchemas = {
    createPost: Joi.object({
        title: Joi.string().trim().required().messages({
            'string.empty': 'Post title cannot be empty',
            'any.required': 'Post title is required'
        }),
        content: Joi.string().trim().required().messages({
            'string.empty': 'Post content cannot be empty',
            'any.required': 'Post content is required'
        })
    }),

    updatePost: Joi.object({
        title: Joi.string().trim().optional(),
        content: Joi.string().trim().optional()
    }).min(1).messages({
        'object.min': 'You must provide at least a title or content to update'
    })
};

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }

        next();
    };
};