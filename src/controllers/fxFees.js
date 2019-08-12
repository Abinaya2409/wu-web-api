"use strict";

const fxFeesModel = require("../models/fxFees");

exports.getFXFees = async function(ctx) {
    const FXFeeId = ctx.params.fxid;
    try {
        const data = await fxFeesModel.getFXFees(FXFeeId, ctx.token);
        ctx.response.success(data, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};