var cleanup;
var setup = function () {
  cleanup = function (obj, visited) {
    if (typeof obj !== "object" ||
        obj === null) return true;
    var isArray = (obj.constructor.name === "Array");

    visited = visited || new Set();
    if (visited.has(obj) ||
        visited.size > 10) return undefined;

    visited.add(obj);

    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {

        var res = cleanup(obj[k], visited);

        if (typeof res === "undefined") {
          if (isArray)
            obj.splice(+k, 1);
          else
            delete obj[k];
        }
      }
    }
    return obj;
  };
};
setup();

var injector = {
  // Nicked from https://github.com/angular/angularjs-batarang/blob/master/js/services/chromeExtension.js
  eval: function (fn, args, cb) {
    // with two args
    if (!cb && typeof args === 'function') {
      cb = args;
      args = {};
    } else if (!args) {
      args = {};
    }
    chrome.devtools.inspectedWindow.eval('(' + fn.toString() + '(window, ' + JSON.stringify(args) + '));', cb);
  }
}

// Evaluated in the inspected page
var attachRegistry = function (window) {
  (window['require'] || window['define'])(['flight/lib/registry'], function (registry) {
    window.registry = registry;
  });
};

var getRegistry = function (window) {
  return cleanup(window.registry);
};

var logger = function () {
  var args = [].slice.call(arguments);
  window.results = (window.results || []);
  window.results.push(args);
  console.log.apply(console, args);
};

injector.eval(setup);
injector.eval(attachRegistry);