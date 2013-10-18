var panels = chrome.devtools.panels;

var panelAdded = function () {
  console.log.apply(console, [].slice.call(arguments));
};

panels.create("Twitter Flight", "", "panel.html", panelAdded);