const Company = require("../repositories/company");
const response = require("../utils/response");
const Password = require("../utils/password");

const addCompany = async (ctx) => {
  const {
    thumbnail = null,
    name = null,
    description = null,
    email = null,
    password = null,
  } = ctx.request.body;

  const encrypted_password = await Password.encrypt(password);

  const checked = await Company.getCompanyByEmail(email);

  if (checked) {
    return response(ctx, 401, { message: "Email already in use." });
  }

  const company = {
    thumbnail,
    name,
    description,
    email,
    password: encrypted_password,
  };

  const newCompany = await Company.addCompany(company);

  if (newCompany) {
    response(ctx, 201, newCompany);
  } else {
    response(ctx, 401, { message: "Invalid request." });
  }
};

const getCompanyById = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const company = await Company.getCompanyById(id);
    if (company) {
      response(ctx, 201, company);
    } else {
      response(ctx, 401, { message: "No company found." });
    }
  }
};

const getCompanies = async (ctx) => {
  const companies = await Company.getCompanies();
  if (companies) {
    response(ctx, 201, companies);
  } else {
    response(ctx, 401, { message: "No companies found." });
  }
};

module.exports = { addCompany, getCompanies, getCompanyById };
