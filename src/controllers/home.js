"use strict";

const pkginfo = require("../package.json");
const variables = require("../config/variables");

/**
 * @swagger
 * /:
 *  get:
 *    description: Returns API information
 *    responses:
 *      200:
 *        description: Hello API
 */
exports.welcome = ctx => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author,
    environment: variables.env
  };

  ctx.response.ok(data, "Hello, API!");
};