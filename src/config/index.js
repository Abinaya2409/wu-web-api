"use strict";

const path = require("path");

const env = process.env.NODE_ENV || "development";

const configs = {
  base: {
    env,
    host: "localhost",
    port: process.env.APP_PORT || 8081
  },
  production: {
    logger: {
      name: "wu-web-api-dev",
      streams: [
        {
          type: "stream",
          stream: process.stdout,
          level: "debug"
        }
      ]
    }
  },
  development: {
    logger: {
      name: "wu-web-api-dev",
      streams: [
        {
          type: "stream",
          stream: process.stdout,
          level: "debug"
        }
      ]
    }
  },
  test: {
    logger: {
      name: "wu-web-api-test",
      streams: []
    }
  }
};

const config = Object.assign(configs.base, configs[env]);

module.exports = config;
