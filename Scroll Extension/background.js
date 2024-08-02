//On Off state
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({text: "OFF",});
});

const shortsUrl = 'https://www.youtube.com/shorts';
const scrollLimitedEnabled = false;
const scrollLimitTimeout = 10000;

//tab has 4 attributes (id, url, title, index) (index of the tab in the browser)
chrome.action.onClicked.addListener(async(tab) => {
    if (tab.url.startsWith(shortsUrl)){
        const prevState = await chrome.action.getBadgeText({tabId: tab.id});
        const nextState = prevState == "ON" ? "OFF" : "ON"

        await chrome.action.setBadgeText({tabId: tab.id,text: nextState});
        //setBadgeText to the tab with the id ... and the text is ON/ OFF
    
        if (nextState === "ON"){
            scrollLimitedEnabled = true;
            chrome.tabs.sendMessage(tab.id, {action: "enableScrollLimit"});
        }
        else if (nextState === "OFF"){
            scrollLimitedEnabled = false;
            chrome.tabs.sendMessage(tab.id, {action: "disableScrollLimit"});
        }
    }
});


chrome.tabs.onUpdated.addListener((tabId, tabUpdates, tab) => {
    if (tabUpdates.status === "complete" && tab.url.startsWith(shortsUrl) && scrollLimitedEnabled) {
        chrome.tabs.sendMessage(tabId, { action: "startCountdown" });
    }
});





/*function enableScrollLimit(tabId){
    chrome.tabs.sendMessage(tabId, {action: "enableScrollLimit"});   //Sends message to the tab with the specific "tabId". The message triggers an action within the tab
    chrome.tabs.onUpdated.addListener((tabId, tabUpdates, tab) => {  //tabId is an integer id of the tab that was updated, changeInfo is an object that describes what was updated about the tab, tab includes all details about the tab
        if (tabUpdates.status === "complete" && tab.url.startsWith(shortsUrl)) {
            chrome.tabs.sendMessage(tabId, {action: "startCountdown"}); //send message to tabs to trigger countdown
        }
    })
}

function disableScrollLimit(tabId){
    chrome.tabs.sendMessage(tabId, {action: "disableScrollLimit"});
    chrome.tabs.onUpdated.removeListener((tabId, tabUpdates, tab) => {
        if (tabUpdates.status === "complete" && tab.url.startsWith(shortsUrl)){
            chrome.tabs.sendMessage(tabId, {action: "stopCountdown"});
        }
    })
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startCountdown"){
        startCountdown(sender.tab.id);
    } 
    else if (request.action === "stopCountdown"){
        stopCountdown(sender.tab.id);
    }
});
// chrome.runtime.onMessage is an event that handles messages sent from a different script e.g. contentScript.js in this case

function startCountdown(tabId){
    chrome.tabs.sendMessage(tabId, {action: "showCountdown"});
    setTimeout(() => {
        chrome.tabs.sendMessage(tabId, {action: "hideCountdown"});
    }, scrollLimitTimeout);
  }

function stopCountdown(tabId) {
    chrome.tabs.sendMessage(tabId, {action: "hideCountdown"});
  }
*/
