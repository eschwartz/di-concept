define(function() {
  var Writer = function(el) {
    this.el_ = el;
  };

  Writer.prototype.write = function(content) {
    this.el_.innerHTML = '<p>' + content + '</p>';
  };

  return Writer;
});