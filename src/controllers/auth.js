const jwt = require("jsonwebtoken");
const Password = require("../utils/password");
const response = require("../utils/response");

const User = require("../repositories/user");

const authenticate = async (ctx) => {
  const { email = null, password = null } = ctx.request.body;

  if (!email || !password) {
    response(ctx, 404, {
      mensagem: "Bad request.",
    });
  }

  const user = await User.getUserByEmail(email);

  if (user) {
    const comparison = await Password.check(password, user.password);
    if (comparison) {
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "hackwoman",
        {
          expiresIn: "1h",
        }
      );

      response(ctx, 200, {
        message: "User logged in.",
        token: token,
      });
    } else {
      response(ctx, 404, {
        message: "E-mail or password incorrect.",
      });
    }
  } else {
    response(ctx, 404, {
      message: "E-mail or password incorrect.",
    });
  }
};

module.exports = { authenticate };
