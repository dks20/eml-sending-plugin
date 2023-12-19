chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'scrapeHTML') {
      const legacyThreadId = document.querySelector('[data-legacy-thread-id]');
      const result = legacyThreadId ? legacyThreadId.getAttribute('data-legacy-thread-id') : 'Not found';
      const url1 = "https://mail.google.com/mail/u/0?view=att&th="
      const url2 = "&attid=0&disp=comp&safe=1&zw"
      let url = url1.concat(result + url2);
      sendResponse({ data: url });
    }
  });
  

