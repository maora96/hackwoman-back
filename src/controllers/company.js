const Company = require("../repositories/company");
const response = require("../utils/response");

const addCompany = async (ctx) => {
  const {
    thumbnail = null,
    name = null,
    description = null,
    email = null,
    password = null,
  } = ctx.request.body;

  if (!name || !description || !email || !password) {
    response(ctx, 401, { message: "Required fields not filled." });
  }

  const company = { thumbnail, name, description, email, password };

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
