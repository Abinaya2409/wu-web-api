"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.getFXFees = async function(FXFeeId, token) {
    
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
        }/new_feetables(${FXFeeId})?$select=new_feevalue`,
        config
    );
    return response.data;
};