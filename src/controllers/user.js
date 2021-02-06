const response = require("../utils/response");
const Password = require("../utils/password");
const User = require("../repositories/user");

const addUser = async (ctx) => {
  const {
    id = null,
    thumbnail = null,
    email = null,
    password = null,
    name = null,
    role = null,
    about = null,
    technologies = null,
    linkedin = null,
    github = null,
    behance = null,
    apps = null,
  } = ctx.request.body;

  if (!email || !password || !name || !role || !about) {
    return response(ctx, 401, {
      message: "User must have email, password, name, role and about section.",
    });
  }

  const encrypted_password = await Password.encrypt(password);

  const checked = await User.getUserByEmail(email);

  if (checked) {
    return response(ctx, 401, { message: "Email already in use." });
  }

  const user = {
    id,
    thumbnail,
    email,
    password: encrypted_password,
    name,
    role,
    about,
    technologies,
    linkedin,
    github,
    behance,
    apps,
  };

  const newUser = await User.addUser(user);

  if (newUser) {
    return response(ctx, 201, newUser);
  } else {
    return response(ctx, 401, { message: "Invalid request." });
  }
};

const getUserById = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const user = await User.getUserById(id);
    if (user) {
      response(ctx, 201, user);
    } else {
      response(ctx, 401, { message: "No user found." });
    }
  } else {
    response(ctx, 401, { message: "Request invalid." });
  }
};

module.exports = { addUser, getUserById };
