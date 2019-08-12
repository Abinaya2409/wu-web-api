"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.getBeneficiaries = async function(businessAccountId, token) {
    
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
        }/rppc_beneficiaries?$filter=_rppc_customerlink_value eq ${
        businessAccountId
        }&$orderby=modifiedon desc&$select= new_pc_beneficiary_city,rppc_bicswift,new_pc_beneficiary_street,createdon,rppc_iban,new_pc_beneficiary_zip_or_postal_code,rppc_accountname,new_pc_bank_account_state_or_province,new_pc_intermediary_swift_or_bic_code,new_pc_intermediary_iban,new_pc_intermediary_reference,new_pc_intermediary_branch_code,new_pc_intermediary_account_number,new_pc_bank_account_street,new_pc_bank_account_city,rppc_reference,new_pc_beneficiary_reference,new_pc_beneficiary_state_or_province,new_pc_bank_account_zip_or_postalcode,rppc_branchcode,rppc_accountnumber,new_pc_account_type, rppc_bank`,
        config
    );
    return response.data;
};

exports.getBeneficiary = async function(beneficiaryId, token) {
    
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
        }/rppc_beneficiaries(${beneficiaryId})?$select= new_pc_beneficiary_city,rppc_bicswift,new_pc_beneficiary_street,createdon,rppc_iban,new_pc_beneficiary_zip_or_postal_code,rppc_accountname,new_pc_bank_account_state_or_province,new_pc_intermediary_swift_or_bic_code,new_pc_intermediary_iban,new_pc_intermediary_reference,new_pc_intermediary_branch_code,new_pc_intermediary_account_number,new_pc_bank_account_street,new_pc_bank_account_city,rppc_reference,new_pc_beneficiary_reference,new_pc_beneficiary_state_or_province,new_pc_bank_account_zip_or_postalcode,rppc_branchcode,rppc_accountnumber,new_pc_account_type, rppc_bank`,
        config
    );
    delete response.data['@odata.context'];
    delete response.data['@odata.etag'];
    return response.data;
};

exports.createBeneficiary = async function(businessAccountId, beneficiaryDetails, token, beneficiaryCurrencyCode=null, beneficiaryCountry=null, bankAccountCountry=null) {
    const config = {
      headers : {
        'Authorization': 'Bearer ' + token,
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    let beneficiaryAccountData = {
      "rppc_CustomerLink_account@odata.bind": `${variables.crmApiUrl}/accounts(${businessAccountId})`,
      rppc_accountname: beneficiaryDetails.bankAccountName,
      rppc_branchcode: beneficiaryDetails.branchCode,
      rppc_accountnumber: beneficiaryDetails.accountNumber,
      new_pc_beneficiary_street: beneficiaryDetails.recipientStreet,
      new_pc_beneficiary_city: beneficiaryDetails.recipientCity,
      new_pc_beneficiary_state_or_province: beneficiaryDetails.recipientStateOrProvince,
      new_pc_beneficiary_zip_or_postal_code: beneficiaryDetails.recipientZipPostCode,
      new_pc_intermediary_branch_code: beneficiaryDetails.intermediaryBranchCode,
      new_pc_intermediary_account_number: beneficiaryDetails.intermediaryAccount,
      new_pc_intermediary_swift_or_bic_code: beneficiaryDetails.intermediarySwiftBicCode,
      new_pc_intermediary_iban: beneficiaryDetails.intermediaryIban,
      rppc_bicswift: beneficiaryDetails.swiftBicCode,
      rppc_iban: beneficiaryDetails.iban,
    };

    if(beneficiaryCurrencyCode){
      beneficiaryAccountData['rppc_currency@odata.bind'] = `/transactioncurrencies(${beneficiaryCurrencyCode})`
    }
    if(beneficiaryCountry){
      beneficiaryAccountData['new_pc_beneficiary_country@odata.bind'] = `/luup_countrieses(${beneficiaryCountry})`
    }
    if(bankAccountCountry){
      beneficiaryAccountData['new_pc_bank_account_country@odata.bind'] = `/luup_countrieses(${bankAccountCountry})`
    }
    const response = await axios.post(
      `${variables.crmApiUrl}/rppc_beneficiaries`,
      beneficiaryAccountData,
      config
    );
    return response.data;
}

exports.getCurrencybyCode = async function(currencyCode, token) {
  const config = {
    headers : {
      'Authorization': 'Bearer ' + token,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const currencyResponse = await axios.get(`${variables.crmApiUrl}/transactioncurrencies?$filter=isocurrencycode eq '${currencyCode}'&$top=1`, config);
  return currencyResponse.data.value[0];
};

exports.getCountrybyCode = async function(countryCode, token) {
  const config = {
    headers : {
      'Authorization': 'Bearer ' + token,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  const countryResponse = await axios.get(`${variables.crmApiUrl}/luup_countrieses?$filter=luup_countrycode eq '${countryCode}'&$top=1`, config);

  return countryResponse.data.value[0];
};

exports.getCountryResponse = async function(Countrycode, token) {
  const config = {
    headers : {
      'Authorization': 'Bearer ' + token,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const countryResponse = await axios.get(`${variables.crmApiUrl}/new_beneficiary_countries?$filter=new_countrycode eq '${Countrycode}'`, config);
  return countryResponse.data;
};

exports.getCurrencyResponse = async function(currencycode, beneficiaryCountry, token) {
  const config = {
    headers : {
      'Authorization': 'Bearer ' + token,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const currencyResponse = await axios.get(`${variables.crmApiUrl}/new_beneficiarycurrencies?$filter=_new_requirementid_value eq '${beneficiaryCountry}' and new_currencycode eq '${currencycode}'&$expand=new_new_beneficiarycurrency_new_beneficiaryfieldvalidation_RuleSetID($select=new_fieldname, new_condition, new_regex)`, config);
  return currencyResponse.data;
};