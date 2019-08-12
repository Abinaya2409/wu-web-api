"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.getAutoNumber = async function(autoNumberId, token) {
    
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
        }/new_autonumberings(${autoNumberId})?$select=new_transactionidreference`,
        config
    );
    delete response.data['@odata.context'];
    delete response.data['@odata.etag'];
    return response.data;
};

exports.updateAutoNumber = async function(autoNumberId, autoNumber, token) {
    
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
        }/new_autonumberings(${autoNumberId})`,
        {
            new_transactionidreference: autoNumber
        },
        config
    );
    return response.data;
};