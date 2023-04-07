'use strict';

/**
 * banner-static service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::banner-static.banner-static');
