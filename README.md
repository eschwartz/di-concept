# DI-Concept

A proof of concept for a **configuration-based** dependency injection service container using [**RequireJS**](http://requirejs.org/), [**Backbone.Marionette**](http://marionettejs.com/), and [**di-lite.js**](https://github.com/NickQiZhu/di.js).


## Points of Interest

#### example.html
* Runs a `Writer` (writes to DOM) and a `Logger` component (Logs to console)
* Components are run once using the `Foo` module configuration, and once using the `Bar` configuration


#### ServiceRegistration

* Processes JS object configuration, and registers services with the di-lite service container (`ctx`)
* See `foo/config` and `bar/config`


#### Wiring

* The service configurations for `Foo` and `Bar` specify versions of the `Writer` and `Logger` components that are wired up uniquely for each module.
* Each module passes it's service configuration to a base module (`base/module`), which then:
	* Registers the config using the `ServiceRegistration` object
	* Grabs the wired-up `Writer` and `Logger` components from the service container (`ctx`)


## Why?

This setup was inspired by how [Symfony2](http://symfony.com/) uses YML/XML configurations within bundles to wire a service container. I'm not enough of an expert on Symfony or [IOC](http://en.wikipedia.org/wiki/Inversion_of_control) to know if I'm following the pattern correctly, but the ability to configure a large part of your application is pretty nifty.

#### Use case: Backbone.Marionette application

[Backbone.Marionette](http://marionettejs.com/) takes care of a lot of the boilerplate code when constructing modular Backbone JS applications. What you end up with are lot of modules that look something like this:

```
var MyCollectionView = Marionette.CollectionView.extend({
	itemView: SomeItemView,
	emptyView: SomeLameView
	itemViewOptions: {
		template: someTemplate,
		ui: {
			'awesomeButton': '#theBtn'
		}
	},
	collection: Backbone.Collection.extend({
		model: SomeModel
	}),
	// ...
});

var MyItemView = Marionette.ItemView.extend({
	// more config!
});
```

That's a lot of configuration, eh?

Inversion of control will let us pull out all of our configuration options for all of our views into a central config. This is easier to maintain, and, if you're creating many modules which differ only in configuration, it can save your Ctrl-C/Ctrl-V keys from much wear and tear.


## One Gotchya

#### Scenario

Watch out for trying to access the service container when it's state may have changed.

Consider the following scenario:

```
// main.js
var foo = new Foo();		// ctx is wired up for foo
var bar = new bar();		// ctx is wired up for bar, overriding foo config

foo.doSomething();


// Foo.js
Foo.prototype.doSomething = function() {
	var someService = ctx.get('SomeService');   // oops… ctx is wired up for bar
	someService.run();
}
```

Note that SomeService will now be instantiated using the Bar configuration: the Bar module config overwrote the Foo config when `new Bar()` was constructed.

#### Solution

One solution is to **only attempt access the service container in the module constructor** this way you can be sure that you're using the correct configuration.

```
var Foo = function() {
	// Register service container…
	
	this.someService_ = ctx.get('SomeService);	
};

Foo.prototype.doSomething = function() {
	this.someService_.run();
}
```

In fact, di-lite.js even has a helper for setting dependencies as class properties:

```
var Foo = function() {
	// Register service container…
	
	this.dependencies = ['someService_=SomeService'];
	
	// Resolve dependencies
	ctx.initialize();
	
	// this.someService_ is now set to ctx.get('SomeService'); 
}
```

Another solution may be to have separate service container instances for each module. I'd have to run through this scenario to see what the costs/benefits would be. It may depend largely on what type of architecture you're trying to setup.


## Thoughts on di-lite

Di-lite was very easy to get up-and-running with, and handled most everything I could think to throw at it (at least in this small concept app). So kudos to di-lite!

Some improvements could be made:

**Allow ctx.register to directly accept configuration objects**
  
In other words, bake the ServiceRegistration component into the library
	
**Use a more clear syntax for registering dependencies**

Currently, dependencies can be baked into a class doing this:

```
var SomeClass = function() {
	this.dependencies = ['someDep_=SomeService, someOtherDep_=SomeOtherService'];
	ctx.initialize();
}
```

Registering dependencies as a string seems little clunky, and have a shared `ctx` container modify all of my class instances by reading string on an arbitrary property scares me ever so slightly.

How about something like this:

```
var SomeClass = function() {
	ctx.bakeDependenciesInto({
		'someDep_': 'SomeService',
		'someOtherDep_': 'SomeOtherService'
	}, this);
}
```
	

	