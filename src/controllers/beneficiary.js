"use strict";

const beneficiaryModel = require("../models/beneficiary");
const contactModel = require("../models/contact");

exports.getBeneficiaries = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have beneficiary');
        }
        const data = await beneficiaryModel.getBeneficiaries(contact._luup_contactworldunitedbusiness_value, ctx.token);
        ctx.response.success(data.value, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.getBeneficiary = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    const beneficiaryId = ctx.params.bid;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have beneficiary');
        }
        const data = await beneficiaryModel.getBeneficiary(beneficiaryId, ctx.token);
        ctx.response.success(data, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.createBeneficiary = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    const beneficiaryDetails = ctx.request.body;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have beneficiary');
        }
        if(beneficiaryDetails.bankAccountCurrency){
            var beneficiaryCurrencyCode = await beneficiaryModel.getCurrencybyCode(beneficiaryDetails.bankAccountCurrency, ctx.token);
        }
        if(beneficiaryDetails.recipientCountry){
            var beneficiaryCountry = await beneficiaryModel.getCountrybyCode(beneficiaryDetails.recipientCountry, ctx.token);
        }
        if(beneficiaryDetails.bankAccountCountry){
            var bankAccountCountry = await beneficiaryModel.getCountrybyCode(beneficiaryDetails.bankAccountCountry, ctx.token);
        }
        const data = await beneficiaryModel.createBeneficiary(contact._luup_contactworldunitedbusiness_value, beneficiaryDetails, ctx.token, beneficiaryCurrencyCode.transactioncurrencyid || null, beneficiaryCountry.luup_countriesid || null, bankAccountCountry.luup_countriesid || null);
        ctx.response.success(data, "Successfully created beneficiary");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.getBeneficiaryRequirement = async function(ctx) {
    const {Countrycode, currencycode} = ctx.params;

    const countryData = await beneficiaryModel.getCountryResponse(Countrycode, ctx.token);
    const beneficiaryCountry = countryData.value[0].new_beneficiary_countryid;
    const countryCode = countryData.value[0].new_countrycode;
    const country = countryData.value[0].new_countryname;
    const currencyData = await beneficiaryModel.getCurrencyResponse(currencycode, beneficiaryCountry, ctx.token)
    const currencyCode = currencyData.value[0].new_currencycode;
    const ruleSetId = currencyData.value[0].new_beneficiarycurrency;
    const fields = currencyData.value[0].new_new_beneficiarycurrency_new_beneficiaryfieldvalidation_RuleSetID;
    const data = {
        "id" : countryCode,
        "type" : "RecipientRequirements",
        "attributes": {
            "country": country,
            "countryCode": countryCode,
            "ruleSets" : [
                {
                    "ruleSetId": ruleSetId,
                    "currencyCode": currencyCode,
                    "fields": fields
                }
            ]
        }
    }
    ctx.response.success(data, "Successfully fetched responses");
}

