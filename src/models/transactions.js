"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.getTransactions = async function(businessAccountId, token) {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
          "OData-MaxVersion": "4.0",
          "OData-Version": "4.0",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
    };
    let response = await axios.get(
        `${
        variables.crmApiUrl
        }/new_financialaccountses?$filter=_new_accountfinancialaccountid_value eq ${
        businessAccountId
        }&$orderby=modifiedon desc&$expand=new_new_financialaccounts_new_financialtransactions_FinancialAccountNumber($select=new_transactiondate, new_transactionid, new_transactiondescription, createdon, new_transactionamount, new_transactiontype)`,
        config
    );
    return response.data;
};

exports.getTransactionsbyWallet = async function(financialAccountId, token) {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
          "OData-MaxVersion": "4.0",
          "OData-Version": "4.0",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
    };
    let response = await axios.get(
        `${
        variables.crmApiUrl
        }/new_financialtransactionses?$filter=_new_financialaccountnumber_value eq ${
          financialAccountId
        }&$orderby=modifiedon desc&$select=new_transactiondate, new_transactionid, new_transactiondescription, createdon, new_transactionamount, new_transactiontype`,
        config
    );
    return response.data;
};

exports.createTransactionsbyWallet = async function(financialAccountId, transactionDetails, token) {
    const config = {
        headers: {
          Authorization: "Bearer " + token,
          "OData-MaxVersion": "4.0",
          "OData-Version": "4.0",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
    };  
    let currentDate = new Date();
    currentDate = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1>9?currentDate.getMonth()+1:"0"+(currentDate.getMonth()+1))+"-"+currentDate.getDate();
    let transactionData = {
      "new_FinancialAccountNumber@odata.bind" :`/new_financialaccountses(${financialAccountId})`,
      new_transactiondate : currentDate,
      new_transactiontype: transactionDetails.transactionType,
      new_transactionamount: transactionDetails.transactionAmount,
      new_transactiondescription: transactionDetails.transactionDescription,
      new_transactionid: `${transactionDetails.transactionId}`
    };
    let response = await axios.post(
        `${
        variables.crmApiUrl
        }/new_financialtransactionses`,
        transactionData,
        config
    );
    return response.data;
};