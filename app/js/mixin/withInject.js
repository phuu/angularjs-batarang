define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withInject;

  /**
   * Module function
   */

  function withInject() {

    this.before('initialize', function () {
      this.inspectedWindow = chrome.devtools.inspectedWindow;
      this.target = {};

      /**
       * Replicate the target's console. The methods here are shared across all components with this
       * mixin. Potentially dangerous? Maybe.
       */
      this.target.console = {};
      // Inject a function that returns all the keys in the console
      this.inject.call(this, function () {
        var keys = [];
        for (var k in console) keys.push(k);
        return keys;
      }, function (keys) {
        // Having gotten the keys, we add a function at the same key on target.console that proxies
        // the call through by injection. We have to pass target key into the injected function
        // because the forEach closure scope is not available.
        keys.forEach(function (key) {
          this.target.console[key] = function () {
            var args = [].slice.call(arguments);
            this.inject(function (key) {
              console[key].apply(console, [].slice.call(arguments, 1));
            }, [key].concat(args));
          }.bind(this);
        }.bind(this));
      }.bind(this));
    });

    /**
     * Inject a function into the inspected page.
     *
     * Takes: a function, to be run in the context of the inspected page; an (optional) array of
     * arguments to be passed to the function (must be JSON stringifyable), and an (optional)
     * callback function that recieves the result of the eval.
     *
     * Example

          this.target.inject(function (a) {
            return { a: a };
          }, [10], function (result) {
            // result.a === 10;
          });

     * Nicked-ish from angularjs-batarang#js/services/chromeExtension.js
     */
    this.inject = function (fn, args, cb) {
      if (!cb && typeof args === 'function') {
        cb = args;
        args = undefined;
      }
      var argString = JSON.stringify(args || []);
      this.inspectedWindow.eval('(' + fn.toString() + '.apply(window, ' + argString + '));', cb);
    };

  }

});
