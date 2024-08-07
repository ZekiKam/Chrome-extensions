chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: "OFF" });
});

const shortsUrl = 'https://www.youtube.com/shorts';
const reelsUrl = 'https://www.instagram.com/reels';


chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith(shortsUrl) || tab.url.startsWith(reelsUrl)) {
        chrome.action.getBadgeText({ tabId: tab.id }, (prevState) => {
            const nextState = prevState === "ON" ? "OFF" : "ON";

            chrome.action.setBadgeText({ tabId: tab.id, text: nextState });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['contentScript.js']
            });

            chrome.tabs.sendMessage(tab.id, { action: nextState === "ON" ? "enableInterrupt" : "disableInterrupt" });
        });
    }
});