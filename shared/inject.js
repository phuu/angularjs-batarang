// Nicked-ish from https://github.com/angular/angularjs-batarang/blob/master/js/services/chromeExtension.js
var inject = function (fn, args, cb) {
  // args is optional
  if (!cb && typeof args === 'function') {
    cb = args;
    args = undefined;
  }
  chrome.devtools.inspectedWindow.eval('(' + fn.toString() + '.apply(window, ' + JSON.stringify(args || []) + '));', cb);
};

var target = {};

/**
 * Replicate the target's console
 */
target.console = {};
inject(function () {
  var keys = [];
  for (var k in console) {
    keys.push(k);
  }
  return keys;
}, function (keys) {
  keys.forEach(function (key) {
    console.log('setting up', key);
    target.console[key] = function () {
      var args = [].slice.call(arguments);
      inject(function (key) {
        console[key].apply(console, [].slice.call(arguments, 1));
      }, [key].concat(args));
    };
  });
});