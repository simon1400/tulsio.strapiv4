module.exports = [
  'strapi::errors',
  // 'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          "default-src": [
            "'self'",
            "data:",
            "blob:",
            "www.youtube.com",
          ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'minio.news.mys3bucket.com'
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            "www.youtube.com",
            'market-assets.strapi.io',
            'minio.news.mys3bucket.com',
          ],
          "frame-src": [
            "'self'",
            "data:",
            "blob:",
            "www.youtube.com",
          ],
          upgradeInsecureRequests: null
        }
      }
    }
  }
];
