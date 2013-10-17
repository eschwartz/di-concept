define(['vendor/util'], function(_) {
  /**
   * Registers services defined in a configuration object
   * with a dependency injection context.
   *
   * @class diConcept.dependencyinjection.ServiceRegistration
   *
   * @param {serviceConfig} serviceConfig
   *
   * @param {di.ctx} ctx The dependency injection context with which to register services.
   *
   * @param {Object=} opt_options
   * @param {di.strategy=} opt_options.diStrategy
   *        The strategy to use when registering services.
   * @constructor
   */
  var ServiceRegistration = function(serviceConfig, ctx, opt_options) {
    var options = opt_options || {};

    this.serviceConfig_ = this.normalizeServiceConfig_(serviceConfig);

    this.ctx_ = ctx;

    this.diStrategy_ = options.diStrategy || null;
  };


  /**
   * Register services
   */
  ServiceRegistration.prototype.register = function() {
    _.each(this.serviceConfig_, function(config, name) {
      var reg;

      // Register constructor (Class)
      if (_.isFunction(config.type)) {
        reg = this.ctx_.register(name, config.type, config.args);

        if (this.diStrategy_) {
          reg.strategy(this.diStrategy_);
        }
      }
      // Register arbitrary object
      else {
        this.ctx_.register(name).object(config.type);
      }
    }, this);
  };


  /**
   * Normalizes as {
   *  serviceName: {
   *    type: ServiceObject,
   *    args: [argA, argB]
   *  }
   *  // ...
   * }
   *
   * @param {serviceConfig} config
   * @private
   *
   * @return {serviceConfig} Normalized service configuration.
   */
  ServiceRegistration.prototype.normalizeServiceConfig_ = function(config) {
    config || (config = {});

    // Service can configured as either:
    //    serviceName: ServiceObject
    //  or
    //    serviceName: {
    //      type: ServiceObject,
    //      args: [args, to, pass, to, service, object, constructor]
    //    }
    _.each(config, function(service, name) {
      config[name] = {
        type: service.type || service,
        args: service.args || []
      };
    }, this);

    return config;
  };


  return ServiceRegistration;
});
/**
 * @typedef {Object} serviceConfig
 *    Eg:
 *    {
   *      someService: someObject,
   *      anotherService: {
   *        type: SomeConstructor,
   *        args: [args, to, pass, to, service, object, constructor]
   *      }
   *      // ...
   *    }
 */
