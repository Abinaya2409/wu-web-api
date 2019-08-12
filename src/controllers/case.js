"use strict";

const caseModel = require("../models/case");
const contactModel = require("../models/contact");

exports.createCase = async function(ctx) {
    
    const contactId = ctx.req.headers.contactid;
    const caseDetails = ctx.request.body;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        const data = await caseModel.createCase(contact._luup_contactworldunitedbusiness_value, caseDetails, ctx.token);
        ctx.response.success(data, "Successfully created Case");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};
