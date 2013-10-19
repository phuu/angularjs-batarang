chrome.devtools.panels.create("Twitter Flight", "", "../app/panel.html");

var port = xt.connect('flight-batarang-devtools', 'runtime');

console.log('devtools port', port);

port.trigger('hello', {
  a: 10
});

port.on('reply', function () {
  console.log('devtools reply');
  console.log.apply(console, [].slice.call(arguments));
});