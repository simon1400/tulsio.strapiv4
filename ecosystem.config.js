module.exports = {
  apps: [{
    name: 'tulsio-strapi',
    script: './node_modules/.bin/strapi',
    args: 'start',
    cwd: '/opt/tulsio/strapi',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 1337
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 1337
    },
    // Performance optimizations
    max_memory_restart: '2G',
    min_uptime: '10s',
    max_restarts: 10,
    autorestart: true,
    watch: false,

    // Logging
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,

    // Advanced options
    kill_timeout: 5000,
    listen_timeout: 10000,
    shutdown_with_message: false,

    // Source map support
    source_map_support: true,

    // Environment variables - optimize for single instance
    node_args: [
      '--max-old-space-size=2048',
      '--optimize-for-size',
      '--max-semi-space-size=1',
      '--gc-interval=100'
    ].join(' '),

    // Cron restart (optional - restart every night at 3 AM to clear memory)
    cron_restart: '0 3 * * *'
  }]
};
