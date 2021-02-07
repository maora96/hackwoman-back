const database = require("../utils/database");

const addChallenge = async (challenge) => {
  const q = {
    text:
      "insert into challenges (id, company_id, technologies, title, description, links, date_added, expiration_date, category, thumbnail) values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
    values: [
      challenge.company_id,
      challenge.technologies,
      challenge.title,
      challenge.description,
      challenge.links,
      challenge.date_added,
      challenge.expiration_date,
      challenge.category,
      challenge.thumbnail,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getChallengeById = async (id) => {
  const q = {
    text: "select * from challenges where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const getChallengesByCategory = async (category) => {
  const q = {
    text: "select * from challenges where category = $1",
    values: [category],
  };
  const query = await database.query(q);
  return query.rows;
};

const getChallenges = async () => {
  const q = { text: "select * from challenges" };
  const query = await database.query(q);
  return query.rows;
};

module.exports = {
  addChallenge,
  getChallengeById,
  getChallengesByCategory,
  getChallenges,
};
