const msalConfig = {
  auth: {
    clientId: '8cb42f95-78cb-44ca-83ea-9b8bf713ee84',
    redirectUri: 'http://localhost:8080'
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    forceRefresh: false
  }
};

const loginRequest = {
  scopes: [
    'openid',
    'profile',
    'user.read',
    'calendars.read'
  ]
}