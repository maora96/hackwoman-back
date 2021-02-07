const Router = require("koa-router");
const router = new Router();

const Auth = require("./controllers/auth");
const User = require("./controllers/user");
const Challenges = require("./controllers/challenges");
const Company = require("./controllers/company");
const Options = require("./controllers/select_options");

// auth
router.post("/user-login", Auth.authenticateUser);
router.post("/company-login", Auth.authenticateCompany);
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
router.get("/challenges", Challenges.getAllChallenges);
router.get("/challenge/:id", Challenges.getChallengeById);

// select

router.get("/fields", Options.getFieldOptions);
router.get("/apps", Options.getAppOptions);
router.get("/languages", Options.getLanguageOptions);

module.exports = router;
