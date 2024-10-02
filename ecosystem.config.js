module.exports = {
  apps: [
    {
      name: 'linkbook-client',
      script: './server.js',
      args: 'start',
      exec_mode: 'cluster',
      instances: -1,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
