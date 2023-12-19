let url;

document.addEventListener('DOMContentLoaded', function () {
  const ShowData = document.getElementById('ShowData');

  if (ShowData) {
    console.log('Download button found');

    ShowData.addEventListener('click', function () {
      console.log('Button clicked');

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeHTML' }, function (response) {
          url = response.data;
          console.log(url);

          // Fetch the file content
          fetch(url)
            .then(response => response.blob())
            .then(blob => {
              // Convert the Blob to ArrayBuffer
              return new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsArrayBuffer(blob);
              });
            })
            .then(arrayBuffer => {
              // Send the file data to the server
              sendFileToServer(arrayBuffer);
            })
            .catch(error => {
              console.error('Error fetching or processing the file:', error);
            });
        });
      });
    });
  } else {
    console.error('Element with ID "ShowData" not found.');
  }
});

function sendFileToServer(fileData) {
  // Replace 'your_upload_url' with the actual URL for uploading files on your server
  var uploadUrl = 'https://ptsv3.com/t/gygdhqb/';
  
  // Customize the headers and other details as needed
  fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream', // Adjust as needed
    },
    body: fileData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('File successfully uploaded to the server.');
    })
    .catch(error => {
      console.error('Error uploading file to the server:', error);
    });
}
