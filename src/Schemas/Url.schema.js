import joi from 'joi';

const UrlSchema = joi.object({
    url: joi.string().uri().required()
});

export default UrlSchema;