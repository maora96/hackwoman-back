const Challenges = require("../repositories/challenges");
const response = require("../utils/response");

const addChallenge = async (ctx) => {};

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
  } else {
    // get all
    response(ctx, 401, { message: "No category selected." });
  }

  if (challenges) {
    response(ctx, 201, challenges);
  } else {
    response(ctx, 401, { message: "No challenges found." });
  }
};

module.exports = { addChallenge, getChallengeById, getChallenges };
