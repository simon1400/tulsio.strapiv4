module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1b52867313075ffbdfb43627628c847c'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'cCpZSYQAgZoZy3pOtBPoFg=='),
  },
});
