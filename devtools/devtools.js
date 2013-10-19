chrome.devtools.panels.create("Twitter Flight", "", "../app/panel.html");

var port = xt.connect('flight-batarang-devtools', 'runtime');

port.trigger('hello', {
  a: 10
});