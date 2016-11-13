'use strict';
let router = require('koa-router')();
let uuid = require('node-uuid');
let jwt = require('jsonwebtoken');
let config = require('./config');
let jwtMiddleware = require('koa-jwt')({ secret: config.jwt_secret });

router.post('/event', jwtMiddleware, function*() {
  this.body = {success: true};
});

router.post('/login', function*() {
  let code = this.request.body.code;
  let result = {success: false};

  if (code) {
    result.success = true;
    result.auth_token = jwt.sign({ code: code }, config.jwt_secret);
  }

  this.body = result;

  console.log('hit');
});

module.exports = router;
