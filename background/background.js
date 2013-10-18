var respond = function (port, tabId, changeInfo, tab) {
  if (tabId !== msg.inspectedTabId) return;
  port.postMessage('refresh');
};

// Notify of page refreshes
chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function (msg) {
    if (msg.action !== 'register') return;
    var listener = respond.bind(null, port);
    chrome.tabs.onUpdated.addListener(listener);
    port.onDisconnect.addListener(function () {
      chrome.tabs.onUpdated.removeListener(listener);
    });
  });
});
