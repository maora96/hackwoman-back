const Options = require("../repositories/select_options");
const response = require("../utils/response");

const getLanguageOptions = async (ctx) => {
  const options = await Options.getLanguageOptions();
  if (options) {
    response(ctx, 201, options.options);
  } else {
    response(ctx, 401, { message: "No options found." });
  }
};

const getFieldOptions = async (ctx) => {
  const options = await Options.getFieldOptions();
  if (options) {
    response(ctx, 201, options.options);
  } else {
    response(ctx, 401, { message: "No options found." });
  }
};

const getAppOptions = async (ctx) => {
  const options = await Options.getAppOptions();
  if (options) {
    response(ctx, 201, options.options);
  } else {
    response(ctx, 401, { message: "No options found." });
  }
};

module.exports = { getLanguageOptions, getFieldOptions, getAppOptions };
