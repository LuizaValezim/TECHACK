async function getActiveTab(){
    return await browser.tabs.query({currentWindow: true, active: true});
}

async function getFingerPrint(tabs){
    const tab = tabs.pop();
    const finger = await browser.tabs.sendMessage(tab.id, {method: "fingerprint"});
}

var currentTab = getActiveTab().then((tabs) => {
    const fingerprint = getFingerPrint([...tabs]);
});