async function getActiveTab(){
    return await browser.tabs.query({currentWindow: true, active: true});
}

async function getSessionStorage(tabs){
    const tab = tabs.pop();
    const listenners = await browser.tabs.sendMessage(tab.id, {method: "sessionStorage"});
    var score_session= document.getElementById('SessionS');
    score_session.innerHTML =  listenners.data.length;
    console.log("SessionStorage executed!");

    return listenners
}

var currentTab = getActiveTab().then((tabs) => {
    const sessionStorage = getSessionStorage([...tabs]);
});

