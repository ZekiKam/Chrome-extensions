//On Off state
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({text: "OFF",});
});

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

//tab has 4 attributes (id, url, title, index) (index of the tab in the browser)
chrome.action.onClicked.addListener(async(tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)){
        const prevState = await chrome.action.getBadgeText({tabId: tab.id});
        const nextState = prevState == "ON" ? "OFF" : "ON"

        await chrome.action.setBadgeText({tabId: tab.id,text: nextState});
        //setBadgeText to the tab with the id ... and the text is ON/ OFF
    

        //Change page layout
        if (nextState === "ON"){
            await chrome.scripting.insertCSS({files: ["focus-mode.css"], target: {tabId: tab.id}
            });
        }
        else if (nextState === "OFF"){
            await chrome.scripting.removeCSS({files: ["focus-mode.css"], target: {tabId: tab.id}});
        }
    };
});

