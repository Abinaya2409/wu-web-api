"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.getWallets = async function(businessAccountId, token) {
    
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
        }&$orderby=modifiedon desc
        &$select=new_financialaccountnumber, createdon, new_withdrawalbalances, new_accountnumber, new_financialaccountname`,
        config
    );
    return response.data;
};

exports.getWallet = async function(financialAccountId, token) {
    
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
        }/new_financialaccountses(${financialAccountId})?$select=new_financialaccountnumber, createdon, new_withdrawalbalances, new_accountnumber, new_financialaccountname`,
        config
    );
    delete response.data['@odata.context'];
    delete response.data['@odata.etag'];
    return response.data;
};

exports.updateWalletBalance = async function(financialAccountId, balance, token) {
    
    const config = {
        headers: {
          Authorization: "Bearer " + token,
          "OData-MaxVersion": "4.0",
          "OData-Version": "4.0",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
    };

    let response = await axios.patch(
        `${
        variables.crmApiUrl
        }/new_financialaccountses(${financialAccountId})`,
        {
            new_withdrawalbalances: balance
        },
        config
    );
    return response.data;
};