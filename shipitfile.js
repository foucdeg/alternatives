module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-yarn')(shipit);
  require('shipit-shared')(shipit);

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
        installFlags: ['--production'],
        triggerEvent: 'sharedEnd'
      },
      shared: {
        overwrite: true,
        files: ['config/db.json'],
        dirs: ['node_modules']
      }
    },
    staging: {
      servers: [
        {
          host: 'vps',
          user: 'fouc'
        }
      ]
    }
  });

  shipit.task('pm2-reload', () => {
    shipit.remote('pm2 reload  ecosystem.config.js --only alternatives');
  });

  shipit.on('deployed', () => {
    shipit.start('pm2-reload');
    shipit.emit('reloaded');
  });
};
