require.config({
  paths: {
    'vendor/di': 'vendor/di-lite'
  },
  shim: {
    'vendor/di': {
      exports: 'di'
    },
    'vendor/underscore': {
      exports: '_'
    }
  }
});
require(['foo/foo', 'bar/bar'], function(Foo, Bar) {
  var foo, bar;

  foo = new Foo();
  foo.run();

  bar = new Bar();
  bar.run();
});
