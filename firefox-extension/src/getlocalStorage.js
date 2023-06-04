async function getActiveTab(){
    return await browser.tabs.query({currentWindow: true, active: true});
}

async function getLocalStorage(tabs){
    const tab = tabs.pop();
    const listenners = await browser.tabs.sendMessage(tab.id, {method: "localStorage"});
    var score_local = document.getElementById('LocalS');
    var score_real_local = 20;
    if (listenners.data.length > 50){
        score_real_local = 20;
    }else{
        score_real_local = listenners.data.length;
    }
    score_local.innerHTML =  score_real_local;
    return listenners;
}

var currentTab = getActiveTab().then((tabs) => {
    const localStorage = getLocalStorage([...tabs]);
});