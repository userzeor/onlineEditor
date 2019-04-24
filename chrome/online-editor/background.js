chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.greeting  === 'hello') {
    
  }
});
chrome.browserAction.onClicked.addListener(function(tab) {
    window.open("index.html", "_blank");
});
console.log(window)
