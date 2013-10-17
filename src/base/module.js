define([
  'vendor/di',
  'ctx',
  'framework/dependencyinjection/serviceregistration'
], function(di, ctx, ServiceRegistration) {
  var BaseModule = function(opt_options) {
    var serviceRegistration = new ServiceRegistration(
      opt_options.serviceConfig,
      ctx,
      {
        diStrategy: di.strategy.proto
      }
    );

    serviceRegistration.register();
  };

  BaseModule.prototype.run = function() {
    ctx.get('logger').log('Run Forest... Run!');
    ctx.get('writer').write('It was a dark and stormy night...');
    ctx.get('logger').logConfig();
  };

  return BaseModule;
});
