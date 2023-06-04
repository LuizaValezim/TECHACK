async function getActiveTab(){
    return await browser.tabs.query({currentWindow: true, active: true});
}

async function getThirdPartyConnections(tabs){
    const tab = tabs.pop();
    const listenners = await browser.tabs.sendMessage(tab.id, {method: "connections"});
    const all_connections = listenners.data.count;
    var score_connections = document.getElementById('Connect');    
    if(all_connections*0.1 > 20) {score_connections.innerHTML =  20
        let scoreFinal = 100 - 20 - 5;
        var scoreElement = document.getElementById('score');
        scoreElement.innerHTML = scoreFinal; }
    else {
        score_connections.innerHTML = parseInt(all_connections*0.1);
        let scoreFinal = 100 - parseInt(all_connections*0.1) - 5;
        var scoreElement = document.getElementById('score');
        scoreElement.innerHTML = scoreFinal;}
    
}

var currentTab = getActiveTab().then((tabs) => {
    const connections = getThirdPartyConnections([...tabs]);
});