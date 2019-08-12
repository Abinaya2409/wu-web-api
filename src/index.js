#!/usr/bin/env node

"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Koa = require("koa");
const cors = require("kcors");
const config = require("./config");
const logMiddleware = require("./middlewares/log");
const logger = require("./logger");
const requestId = require("./middlewares/requestId");
const responseHandler = require("./middlewares/responseHandler");
const router = require("./routes");
const koaBody = require("koa-body");

const app = new Koa();
app.use(koaBody());
app.use(requestId());
app.use(logMiddleware({ logger }));
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    exposeHeaders: ["X-Request-Id"]
  })
);
app.use(responseHandler());

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
if (!module.parent) {
  app.listen(config.port, config.ip, () => {
    console.log(
      `API server listening on ${config.host}:${config.port}, in ${config.env}`
    );
  });
}

// Expose app
module.exports = app;
