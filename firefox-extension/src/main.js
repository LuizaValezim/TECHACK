function externalLinks(){
  const desiredTags = "link, img, video, audio,script, iframe, source, embed"
  const links = Array.prototype.map.call(document.querySelectorAll(desiredTags),
    (HTMLtag) => { 
      return HTMLtag.href || HTMLtag.src; 
    }
  )
  return {"links": links, "count": links.length};
}

function getCanvasFingerPrint(){

  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3/esm.min.js')
    .then(FingerprintJS => FingerprintJS.load());

  fpPromise
    .then(fp => fp.get())
    .then(result => {
      const visitorId = result.visitorId;
      console.log(visitorId);
    })
}


browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.method) {
      case "connections":
        sendResponse({ 
          data: externalLinks() 
        });
        break;

      case "localStorage":
        sendResponse({ 
          data: Object.entries(localStorage) 
        });
        break;

      case "fingerprint":
        sendResponse({ 
          data: getCanvasFingerPrint() 
        });
        break;
        
      case "sessionStorage":
        sendResponse({ 
          data: Object.entries(sessionStorage) 
        });
        break;

      default:
        sendResponse({ 
          data: null 
        });
    }
  });


