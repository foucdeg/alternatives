module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/alternatives',
      deployTo: '/home/fouc/alternatives',
      repositoryUrl: 'https://github.com/foucdeg/alternatives',
      ignores: ['.git'],
      keepReleases: 3,
      deleteOnRollback: false,
      shallowClone: true,
      yarn: {
        remote: true,
        installFlags: ['--production']
      }
    },
    staging: {
      servers: [
        {
          host: 'vps'
          user: 'fouc'
        }
      ]
    }
  });

  shipit.task('pm2-reload', () => {
    shipit.remote('pm2 reload  ecosystem.config.js --only alternatives');
  });

  shipit.on(['deployed', 'rollbacked'], () => {
    shipit.start('pm2-reload');
    shipit.emit('reloaded');
  });
};
