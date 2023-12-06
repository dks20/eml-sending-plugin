chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'scrapeContent') {
      var content = document.body.textContent;
      chrome.runtime.sendMessage({ action: 'downloadContent', content: content });
    }
  });