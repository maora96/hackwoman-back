const database = require("../utils/database");

const addCompany = async (company) => {
  const q = {
    text:
      "insert into companies (id, thumbnail, name, description, email, password) values (default, $1, $2, $3, $4, $5) returning *",
    values: [
      company.thumbnail,
      company.name,
      company.description,
      company.email,
      company.password,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getCompanyById = async (id) => {
  const q = {
    text: "select * from companies where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const getCompanies = async (category) => {
  const q = {
    text: "select * from companies",
  };
  const query = await database.query(q);
  return query.rows;
};

const getCompanyByEmail = async (email) => {
  const q = {
    text: "SELECT * from companies where email = $1",
    values: [email],
  };

  const query = await database.query(q);
  return query.rows[0];
};

module.exports = {
  addCompany,
  getCompanyById,
  getCompanies,
  getCompanyByEmail,
};
