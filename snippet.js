(window['require'] || window['define'])(['flight/lib/registry'], function (registry) {

  console.log(registry);

  // Helper for wrapping some code in a group
  var group = function (str, callback, collapsed) {
    var key = 'group';
    if (collapsed) key = 'groupCollapsed';
    console[key](str);
    callback();
    console.groupEnd();
  };

  // Do some crazy shit to allow for nice looking logging. Bit silly.
  //   console.dir(make('user', { name: 'Barry', age: 104 }));
  var make = function (name, obj) {
    if (!obj) return;
    var T = eval('(function ' + name + '(obj) { for (var k in obj) this[k] = obj[k]; })');
    return new T(obj);
  };

  // Returns arr without the keys that follow. Naive.
  //    without([1, 2, 3, 4], 2, 4);
  var without = function (arr, ___) {
    var values = [].slice.call(arguments, 1);
    return arr.reduce(function (memo, item) {
      if (values.indexOf(item) === -1) memo.push(item);
      return memo;
    }, []);
  };

  // Inspect an instance wrapped in a component block
  var inspectComponent = function (componentInfo, component, instanceInfo, instance) {
    var args = [].slice.call(arguments);
    group((''+component) || 'Unknown Component', function () {
      inspect.apply(null, args);
    });
  };

  // Inspect just a component instance (assumes the compnent group has been made elsewhere)
  var inspect = function (componentInfo, component, instanceInfo, instance, inspectData) {

    if (inspectData) {
      inspectData.forEach(function (data) {
        console.log(data.key, data.value, data.extra || '');
      });
    }

    group('component', function () {

      // Tell me about the event this thing cares about
      group('events', function () {
        instanceInfo.events.forEach(function (event) {
          console.log(event.type, event.element);
        });
      });

      console.dir(instanceInfo);
      console.dir(instance);

      console.log(instance.node);

      // Interesting data, without the built in Flight stuff
      var componentKeys = without(Object.keys(instance), 'attr', 'identity', 'toString', 'node', '$node');
      var data = componentKeys.reduce(function (memo, key) {
        memo[key] = instance[key];
        return memo;
      }, {});

      if (componentKeys.length) {
        console.dir(make('data', data));
      }

      // Default data
      if (component.prototype.defaults &&
          Object.keys(component.prototype.defaults).length) {
        console.dir(make('defaults', component.prototype.defaults));
      }

      // Current attr state (although inpecting the instace gives a better picture)
      if (instance.attr &&
          Object.keys(instance.attr).length) {
        console.dir(make('attr', instance.attr));
      }

    }, true);

  };

  /**
   * Introspect the page
   */

  // Start by clearing things out
  // console.clear();

  // We have the registry, so we can jump straight in to grab the components
  registry.components.forEach(function (componentInfo, i) {
    // This top level components array isn't instances, it's a meta list of all components of a
    // given type (ie, component X + mixins Y and Z), including any mixins that are used multiple
    // times but on different components.
    var component = componentInfo.component;

    // Create a group for the component, or say we don't know what it is. Flight gets this from
    // the name of the function use to define the component, so that's important.
    group((''+component) || 'Unknown Component', function () {

      // console.dir(componentInfo);
      // console.dir(component);

      // Now iterate through the actual loaded instances of the component, attach stuff and inspect.
      // Btw, instances isn't an array. wtf flight?
      Object.keys(componentInfo.instances).forEach(function (key, j) {

        var instanceInfo = componentInfo.instances[key];
        var instance = instanceInfo.instance;

        // ... there was some event stuff in here, but it didn't work so great

        // Ok now inspect it. This is repeatable.
        inspect(componentInfo, component, instanceInfo, instance);

      });
    });
  });

});