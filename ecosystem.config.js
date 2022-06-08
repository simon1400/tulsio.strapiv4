module.exports = {
  apps : [{
    name   : "Tulsio strapi",
    script : "yarn start",
    env_production: {}
  }],

  deploy : {
    production : {
      user : 'dimi',
      host : ['89.221.216.23'],
      ref  : 'origin/main',
      repo : 'git@github.com:simon1400/tulsio.strapiv4.git',
      path : '/var/www/tulsio/strapi',
      'post-deploy' : 'yarn && yarn build && pm2 reload ecosystem.config.js --env production',
    }
  }
};
