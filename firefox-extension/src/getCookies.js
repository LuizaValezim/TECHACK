function getActiveTab() {
    return browser.tabs.query({ currentWindow: true, active: true });
  }
  
  function documentFiller(htmlId, htmlText, value) {
    let documentElement = document.getElementById(htmlId);
    let text = document.createTextNode(htmlText + value);
    documentElement.appendChild(text);
  }
  
  function showCookies(tabs) {
    let tab = tabs.pop();
  
    let firstPartyAmount = 0;
    let thirdPartyAmount = 0;
    let sessionAmount = 0;
    let navigationAmount = 0;
  
    let allCookies = browser.cookies.getAll({ url: tab.url });
  
    allCookies.then((cookies) => {
      if (cookies.length > 0) {
        for (let cookie of cookies) {
          tab.url.includes(cookie.domain)
            ? firstPartyAmount++
            : thirdPartyAmount++;
          cookie.session != undefined ? sessionAmount++ : navigationAmount++;
        }
  
        documentFiller("cookies-amount", "Cookies: ", cookies.length);
  
        documentFiller(
          "cookies-first-party-amount",
          "First party cookies: ",
          firstPartyAmount
        );
  
        documentFiller(
          "cookies-third-party-amount",
          "Third party cookies: ",
          thirdPartyAmount
        );
  
        documentFiller(
          "cookies-navigation-amount",
          "Navigation cookies: ",
          navigationAmount
        );
      }
    });

  }
  
  getActiveTab().then(showCookies);