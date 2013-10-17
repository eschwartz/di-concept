define(['ctx'], function(ctx) {
  var Logger = function(prefix) {
    this.prefix_ = prefix;
  };

  Logger.prototype.log = function(content) {
    console.log(this.prefix_, content );
  };

  Logger.prototype.logConfig = function() {
    console.log(ctx.get('config'));
  };


  return Logger;
});
