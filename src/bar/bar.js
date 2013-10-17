define([
  'vendor/util',
  'base/module',
  'bar/config/service'
], function(_, BaseModule, barServiceConfig) {
  var Bar = function(opt_options) {
    var options = _.extend({
      serviceConfig: barServiceConfig
    }, opt_options);

    BaseModule.call(this, options);
  };
  _.inherits(Bar, BaseModule);

  return Bar;
});
