chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getScrapedData") {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: {tabId},
          func: () => {
            const title = document.title;
            const headings = Array.from(document.getElementsByTagName("h1")).map((heading) => heading.textContent);
            const paragraphs = Array.from(document.getElementsByTagName("p")).map((paragraph) => paragraph.textContent);
  
            return {title, headings, paragraphs};
          }
        }, (results) => {
          sendResponse({scrapedData: results[0]});
        });
      });
    }
  });
  