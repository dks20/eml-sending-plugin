document.addEventListener('DOMContentLoaded', function () {
    var scrapeButton = document.getElementById('scrapeButton');
  
    if (scrapeButton) {
      console.log("Button found. Adding event listener.");
  
      scrapeButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeContent' });
        });
      });
  
    } else {
      console.error("Button with ID 'scrapeButton' not found.");
    }
  
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.action === 'downloadContent') {
        downloadFile(request.content, 'scraped_content.txt');
      }
    });
  
    function downloadFile(content, filename) {
      var blob = new Blob([content], { type: 'text/plain' });
      var url = URL.createObjectURL(blob);
  
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });
  