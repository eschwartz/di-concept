define([
  'base/components/logger',
  'base/components/writer',
  'bar/config/config'
], function() {
  return {
    logger: {
      type: require('base/components/logger'),
      args: 'bar says: '
    },
    writer: {
      type: require('base/components/writer'),
      args: [document.getElementById('barOutput')]
    },
    config: require('bar/config/config')
  };
});
