// CRM variables
const crmUrl = "https://sandboxpayconstruct.crm11.dynamics.com";
const crmTenant = "8a8f5201-8ba1-48bf-9b70-3e33284d9a09";
const crmApplicationId = "4383f2c3-5b27-4dcd-a208-15e5ec56b1cd";
const crmClientSecret = "eloRf4mrmTVmgnoB6pkV6piPF1tXSloDAZo3DfF5ohg=";
const crmAuthorityHost = "https://login.microsoftonline.com";
const crmApiVersion = "v9.0";
const crmApiUrl = crmUrl + "/api/data/" + crmApiVersion;


const env = process.env.NODE_ENV;

const variables = {
  crmUrl,
  crmTenant,
  crmApplicationId,
  crmClientSecret,
  crmAuthorityHost,
  crmApiVersion,
  crmApiUrl,
  env
};

module.exports = variables;
