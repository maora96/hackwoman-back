const Challenges = require("../repositories/challenges");
const response = require("../utils/response");

const addChallenge = async (ctx) => {
  const {
    company_id = null,
    technologies = null,
    title = null,
    description = null,
    links = null,
    date_added = null,
    expiration_date = null,
    category = null,
  } = ctx.request.body;

  if (
    !company_id ||
    !description ||
    !technologies ||
    !title ||
    !links ||
    !date_added ||
    !expiration_date ||
    !category
  ) {
    response(ctx, 404, { message: "Required fields not filled." });
  }

  const challenge = {
    company_id,
    description,
    technologies,
    title,
    links,
    date_added,
    expiration_date,
    category,
  };

  const dbChallenge = await Challenges.addChallenge(challenge);

  if (dbChallenge) {
    response(ctx, 201, dbChallenge);
  } else {
    response(ctx, 401, { message: "Invalid request." });
  }
};

const getChallengeById = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const challenge = await Challenges.getChallengeById(id);
    if (challenge) {
      response(ctx, 201, challenge);
    } else {
      response(ctx, 401, { message: "No challenge found." });
    }
  } else {
    response(ctx, 404, { message: "ID can't be null." });
  }
};

const getChallenges = async (ctx) => {
  const { category = null } = ctx.params;

  if (category) {
    // get by category
    const challenges = await Challenges.getChallengesByCategory(category);
    if (challenges) {
      response(ctx, 201, challenges);
    } else {
      response(ctx, 401, { message: "No challenges found." });
    }
  } else {
    // get all
    response(ctx, 401, { message: "No category selected." });
  }
};

module.exports = { addChallenge, getChallengeById, getChallenges };
