define([
  'vendor/util',
  'base/module',
  'foo/config/service'
], function(_, BaseModule, fooServiceConfig) {
  var Foo = function(opt_options) {
    var options = _.extend({
      serviceConfig: fooServiceConfig
    }, opt_options);

    BaseModule.call(this, options);
  };
  _.inherits(Foo, BaseModule);

  return Foo;
});
