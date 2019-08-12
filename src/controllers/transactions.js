"use strict";

const transactionsModel = require("../models/transactions");
const contactModel = require("../models/contact");

exports.getTransactions = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have permision to view transactions');
        }
        const data = await transactionsModel.getTransactions(contact._luup_contactworldunitedbusiness_value, ctx.token);
        var transactions = [];
        data.value.forEach((trans) => {
            trans.new_new_financialaccounts_new_financialtransactions_FinancialAccountNumber.forEach((transaction) => {
                transactions.push(transaction);
            })
        });
        ctx.response.success(transactions, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.getTransactionsbyWallet = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    const financialAccountId = ctx.params.faid;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have permision to view transactions');
        }
        const data = await transactionsModel.getTransactionsbyWallet(financialAccountId, ctx.token);
        ctx.response.success(data.value, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};

exports.createTransactionsbyWallet = async function(ctx) {
    const contactId = ctx.req.headers.contactid;
    const financialAccountId = ctx.params.faid;
    const transactionDetails = ctx.request.body;
    try {
        let contact = await contactModel.getContact(contactId, ctx.token);
        if(!contact.luup_contactworldunitedsignatory){
            ctx.response.badRequest(null, 'You don\'t have permision to create transaction');
        }
        const data = await transactionsModel.createTransactionsbyWallet(financialAccountId, transactionDetails, ctx.token);
        ctx.response.success(data, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};