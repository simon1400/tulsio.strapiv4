'use strict';

/**
 * calculator controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::calculator.calculator');
