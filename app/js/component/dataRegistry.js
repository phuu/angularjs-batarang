define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withInject = require('mixin/withInject');

  /**
   * Module exports
   */

  return defineComponent(dataRegistry, withInject);

  /**
   * Module function
   */

  function dataRegistry() {
    this.defaultAttrs({
      injectors: {
        attachRegistry: function () {
          require(['flight/lib/registry'], function (registry) {
            console.log(registry);
            window.registry = registry;
          });
        },
        getRegistryKeys: function () {
          return Object.keys(window.registry).map(function (key) {
            return {
              key: key,
              type: typeof window.registry[key]
            };
          });
        }
      }
    });


    this.gotRegistryKeys = function (result, isException) {
      console.log('gotRegistryKeys');
      console.log.apply(console, [].slice.call(arguments));
    };

    this.attachedRegistry = function (result, isException) {
      this.inject(this.attr.injectors.getRegistryKeys, this.gotRegistryKeys.bind(this));
    };

    this.after('initialize', function () {
      this.inject(this.attr.injectors.attachRegistry, this.attachedRegistry.bind(this));
    });
  }

});
