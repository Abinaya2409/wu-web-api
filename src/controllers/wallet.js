"use strict";

const walletModel = require("../models/wallet");
const contactModel = require("../models/contact");

exports.getWallets = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have wallets');
        }
        const data = await walletModel.getWallets(contact._luup_contactworldunitedbusiness_value, ctx.token);
        ctx.response.success(data.value, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.getWallet = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    const financialAccountId = ctx.params.faid;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have wallets');
        }
        const data = await walletModel.getWallet(financialAccountId, ctx.token);
        ctx.response.success(data, "Wallet fetched successfully");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.updateWalletBalance = async function(ctx) {
    const financialAccountId = ctx.params.faid;
    const balance = ctx.request.body.balance;
    try {
        const data = await walletModel.updateWalletBalance(financialAccountId, balance, ctx.token);
        ctx.response.success(data.value, "Updated the balance successfully");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};