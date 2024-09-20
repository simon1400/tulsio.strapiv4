'use strict';

/**
 * article-base service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article-base.article-base');
