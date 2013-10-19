// chrome.devtools.panels.create("Flight", "", "../app/panel.html");

var port = xt.connect('flight-batarang-devtools');

var gotRegistryKeys = function (result, isException) {
  console.log.apply(console, [].slice.call(arguments));
  target.console.log('Flight Batarang ready');
};

var attachedRegistry = function (result, isException) {
  inject(getRegistryKeys, gotRegistryKeys);
};

inject(utils);
inject(attachRegistry, attachedRegistry);