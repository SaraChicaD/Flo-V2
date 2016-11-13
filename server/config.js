'use strict';

let path = require('path');
let environment = process.env.NODE_ENV || 'production';
let localStaticPath = environment == 'production' ? '../client' : '../dist/client';

module.exports = {
  env: environment,
  port: process.env.PORT || 8000,
  staticPath: path.resolve(__dirname, localStaticPath),
  jwt_secret: process.env.JWT_SECRET || 'check-yo-flo',
  clientId: process.env.CLIENT_ID || 'not-my-client',
  clientSecret: process.env.CLIENT_SECRET,
  redirectUrl: process.env.REDIRECT_URL
};
