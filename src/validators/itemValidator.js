import Joi from "joi";

const itemValidator = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  price: Joi.string(),
});

export { itemValidator };
