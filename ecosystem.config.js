module.exports = {
  apps: [
    {
      name: 'linkbook-client',
      script: 'next start -p:4000',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
