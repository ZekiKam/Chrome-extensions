console.log(chrome.action);
const shortsUrl = 'https://www.youtube.com/shorts';
const reelsUrl = 'https://www.instagram.com/reels';
//consider tiktok


chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: "OFF" });
});


chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith(shortsUrl) || tab.url.startsWith(reelsUrl)) {

        //Toggle effect
        chrome.action.getBadgeText({ tabId: tab.id }, (prevState) => {
            const nextState = prevState === "ON" ? "OFF" : "ON";
            chrome.action.setBadgeText({ tabId: tab.id, text: nextState });
        
        chrome.action.setPopup({popup: 'popup.html'});

        if (nextState === "ON") {
            //fetch next option from pop.js
            chrome.runtime.onMessage.addListener((message) => {
                if (message.action === "setOption") {
                    selectedOption = message.option;
                    chrome.tabs.sendMessage(tab.id, { action: "enableInterrupt", option: selectedOption });
                }
            });  
            
            chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['contentScript.js']
            }); 
        
        
        } else {
            chrome.tabs.sendMessage(tab.id, { action: "disableInterrupt" });
        }
    });


    } else { // incorrect url
        chrome.action.setPopup({popup:''}) //clear popup
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: showAlert
        });
    }
});



function showAlert() {
    alert("This extension only works for YouTube Shorts and Instagram Reels.");
}
