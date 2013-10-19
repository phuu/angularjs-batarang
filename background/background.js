/**
 * CONFIGURATION
 */

chrome.manifest = chrome.app.getDetails();

/**
 * CONTENT SCRIPTS
 */

// Programmatically inject an array of scripts
var inject = function (id, scripts) {
  scripts.forEach(function (script) {
    chrome.tabs.executeScript(id, {
      file: script
    });
  });
};

// Listen for embedded events
chrome.extension.onConnect.addListener(function(rawPort) {

  // Ignore anything that doesn't begin with Flight
  if (!rawPort.name.match(/^flight-batarang/)) return;

  var port = PortWrapper(rawPort),
      tab = rawPort.sender.tab;

  /**
   * port.on('x')
   */

  port.on('hello', function () {
    console.log('message from', rawPort.name);
    console.log.apply(console, [].slice.call(arguments));
    port.trigger('reply', {
      hello: 'world'
    });
  });

});