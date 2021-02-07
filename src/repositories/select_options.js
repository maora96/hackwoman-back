const database = require("../utils/database");

const getLanguageOptions = async () => {
  const q = {
    text: "select * from options where id = 1",
  };

  const query = await database.query(q);
  return query.rows[0];
};

const getFieldOptions = async () => {
  const q = {
    text: "select * from options where id = 3",
  };

  const query = await database.query(q);
  return query.rows[0];
};

const getAppOptions = async () => {
  const q = {
    text: "select * from options where id = 2",
  };

  const query = await database.query(q);
  return query.rows[0];
};

module.exports = { getLanguageOptions, getFieldOptions, getAppOptions };
