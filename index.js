const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const PORT = process.env.PORT || 8081;
const app = new Koa();
const cors = require("@koa/cors");
const router = require("./src/routes");

app.use(cors({ origin: "*" }));
app.use(bodyparser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 8081, "0.0.0.0", () =>
  console.log("backend online.")
);
