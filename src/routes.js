const Router = require("koa-router");
const router = new Router();

const Auth = require("./controllers/auth");
const User = require("./controllers/user");
const Challenges = require("./controllers/challenges");
const Company = require("./controllers/company");

// auth
router.post("/user-login", Auth.authenticate);
router.post("/company-login", Auth.authenticate);
// user
router.post("/user", User.addUser);
router.get("/user/:id", User.getUserById);

// company
router.post("/company", Company.addCompany);
router.get("/company", Company.getCompanies);
router.get("/company/:id", Company.getCompanyById);

// challenges
router.post("/challenges", Challenges.addChallenge);
router.get("/challenges/:category", Challenges.getChallenges);
router.get("/challenge/:id", Challenges.getChallengeById);

module.exports = router;
