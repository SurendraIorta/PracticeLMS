// Create the main MSAL instance
// configuration parameters are located in config.js
const msalClient = new Msal.UserAgentApplication(msalConfig);

if (msalClient.getAccount() && !msalClient.isCallback(window.location.hash)) {
  // avoid duplicate code execution on page load in case of iframe and Popup window.
  updatePage(msalClient.getAccount(), Views.home);
}