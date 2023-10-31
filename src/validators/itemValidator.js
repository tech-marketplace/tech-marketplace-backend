import Joi from "joi";

const itemValidator = Joi.object({
  itemImage: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  price: Joi.string(),
  countInStock: Joi.number(),
});

export { itemValidator };
