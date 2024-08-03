chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: "OFF" });
});

const shortsUrl = 'https://www.youtube.com/shorts';
const reelsUrl = 'https://www.instagram.com/reels';

chrome.action.onClicked.addListener((tab) => {
    console.log("button clicked");
    if (tab.url.startsWith(shortsUrl) || tab.url.startsWith(reelsUrl)) {
        chrome.action.getBadgeText({ tabId: tab.id }, (prevState) => {
            const nextState = prevState === "ON" ? "OFF" : "ON";

            chrome.action.setBadgeText({ tabId: tab.id, text: nextState });

            // Inject script only if state is "ON" and script is not already injected
            if (nextState === "ON") {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['contentScript.js']
                });
            }

            // Send message to content script to enable/disable interruptions
            chrome.tabs.sendMessage(tab.id, { action: nextState === "ON" ? "enableInterrupt" : "disableInterrupt" });
        });
    } else {
        // Handle case where URL is not valid
        chrome.action.setBadgeText({ tabId: tab.id, text: "OFF" });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: showAlert
        });
    }
});

function showAlert() {
    alert("This extension only works for YouTube Shorts and Instagram Reels.");
}
