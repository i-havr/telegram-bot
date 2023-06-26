const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const { handleDbSchemaError } = require("../helpers");

const logDbSchema = Schema(
  {
    timestamp: {
      type: String,
    },
    url: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

// logDbSchema.post("findOneAndUpdate", handleDbSchemaError);

const Log = model("log", logDbSchema);

// const joiLoginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

module.exports = {
  Log,
};
