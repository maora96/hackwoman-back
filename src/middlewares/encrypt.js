const Password = require("../utils/password");

const encrypt = async (ctx, next) => {
  const { password = null } = ctx.request.body;

  if (!password) {
    response(ctx, 404, {
      message: "Bad request",
    });
  }

  const hash = await Password.encrypt(password);
  ctx.state.hash = hash;
  return next();
};

module.exports = { encrypt };
