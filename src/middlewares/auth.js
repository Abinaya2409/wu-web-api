'use strict';


/**
 * Return middleware that gets an unique request id from a header or
 * generates a new id.
 * @param {Object} tokenResponse - Optional configuration
 * @param {String} tokenResponse.accessToken - Access token

 * @return {Function} - Koa middleware
 */
  const variables = require('../config/variables');
  const cache = require('memory-cache');
  const AuthenticationContext = require('adal-node').AuthenticationContext;

  const tenant = variables.crmTenant;
  const authorityUrl = 'https://login.microsoftonline.com' + '/' + tenant;
  const applicationId = variables.crmApplicationId;
  const clientSecret = variables.crmClientSecret;
  const resource = variables.crmUrl;

  const context = new AuthenticationContext(authorityUrl);

  // Updates token every 55 minutes

  function reAuthorize() {
    setInterval(()=>{
      context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, (err, tokenResponse) =>{
        if (err) {
          console.log('well that didn\'t work: ' + err.stack);
        } else {
          cache.put('token', tokenResponse.accessToken)
        }
      });
    }, 900000)
  }

  exports.authorize = function() {
    context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, (err, tokenResponse) =>{
      if (err) {
        console.log('well that didn\'t work: ' + err.stack);
      } else {
        console.log(tokenResponse.accessToken)
        cache.put('token', tokenResponse.accessToken);
      }
    });
    reAuthorize();
  };

exports.getToken = function(ctx, next) {
  ctx.token = cache.get('token');
  return next();
};