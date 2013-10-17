define([
  'base/components/logger',
  'base/components/writer',
  'foo/config/config'
], function() {
  return {
    logger: {
      type: require('base/components/logger'),
      args: 'foo says: '
    },
    writer: {
      type: require('base/components/writer'),
      args: [document.getElementById('fooOutput')]
    },
    config: require('foo/config/config')
  };
});
