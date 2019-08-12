"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.getContact = async function(contactId, token) {
    const config = {
      headers : {
        'Authorization': 'Bearer ' + token,
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    const contactResponse = await axios.get(`${variables.crmApiUrl}/contacts(${contactId})?$select= luup_skypeid, luup_contactaffiliateid, luup_nationality, luup_mobileprefix, luup_wechatid, salutation, firstname, lastname, emailaddress1, birthdate, mobilephone, address1_stateorprovince, address1_postalcode, address1_country, address1_city, address1_line1, address1_line2, address1_line3, luup_contactworlduniteddefaultmargin, _luup_contactworldunitedbusiness_value, luup_contactworldunitedsignatory`, config);

    return contactResponse.data;
};