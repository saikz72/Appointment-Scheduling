import Joi from "joi";

const authSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  password: Joi.string()
    .min(5)
    .max(30)
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "password"
    ),
});

export default authSchema;
