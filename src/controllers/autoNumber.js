"use strict";

const autoNumberModel = require("../models/autoNumber");

exports.getAutoNumber = async function(ctx) {
    const autoNumberId = ctx.params.anid;
    try {
        const data = await autoNumberModel.getAutoNumber(autoNumberId, ctx.token);
        ctx.response.success(data, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.updateAutoNumber = async function(ctx) {
    const autoNumberId = ctx.params.anid;
    const autoNumber = ctx.request.body.autoNumber;
    try {
        const data = await autoNumberModel.updateAutoNumber(autoNumberId, autoNumber, ctx.token);
        ctx.response.success(data, "Updated the number successfully");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};