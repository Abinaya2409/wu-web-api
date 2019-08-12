"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.createCase = async function(businessAccountId, caseDetails, token) {
    const config = {
      headers : {
        'Authorization': 'Bearer ' + token,
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    let CaseData = {
      "customerid_account@odata.bind": `${variables.crmApiUrl}/accounts(${businessAccountId})`,
      "title" : "wireout",
      "description" : `${caseDetails}`
    };
    const response = await axios.post(
      `${variables.crmApiUrl}/incidents`,
      CaseData,
      config
    );
    return response.data;
}
