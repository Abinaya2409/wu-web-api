// CRM variables
const crmUrl = process.env.CRM_URL;
const crmTenant = process.env.CRM_TENANT;
const crmApplicationId = process.env.CRM_APPLICATION_ID;
const crmClientSecret = process.env.CRM_CLIENT_SECRET;
const crmAuthorityHost = process.env.CRM_AUTHORITY_HOST;
const crmApiVersion = process.env.CRM_API_VERSION;
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
