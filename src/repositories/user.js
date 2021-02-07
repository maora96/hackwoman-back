const database = require("../utils/database");

const addUser = async (user) => {
  const q = {
    text:
      "insert into users (id, thumbnail, email, password, name, role, about, technologies, linkedin, github, behance, apps, background) values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *",
    values: [
      user.thumbnail,
      user.email,
      user.password,
      user.name,
      user.role,
      user.about,
      user.technologies,
      user.linkedin,
      user.github,
      user.behance,
      user.apps,
      user.background,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getUserByEmail = async (email) => {
  const q = {
    text: "SELECT * from users where email = $1",
    values: [email],
  };

  const query = await database.query(q);
  return query.rows[0];
};

const getUserById = async (id) => {
  const q = {
    text: "SELECT * from users where id = $1",
    values: [id],
  };

  const query = await database.query(q);
  return query.rows[0];
};

module.exports = { addUser, getUserByEmail, getUserById };
