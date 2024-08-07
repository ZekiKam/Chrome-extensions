document.getElementById("countdown").addEventListener('click',() =>{
    console.log("Countdown button clicked");
    chrome.runtime.sendMessage({action: "setOption", option:"countdown"});
});

document.getElementById('puzzle').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "setOption", option:"puzzle"});
});
  
document.getElementById('quote').addEventListener('click', () => {
    console.log("Quote button clicked");
    chrome.runtime.sendMessage({action: "setOption", option:"quote"});
});
  
document.getElementById('quit').addEventListener('click', () => {
    console.log("Quit button clicked");
    chrome.runtime.sendMessage({action: "setOption", option:"quit"});
});
 
//Send message (option) to background.js and it will direct the message to contentScript.js
//Can't send message to contentScript.js directly because they run in separate execution environments (popup.js: popup, contextScript.js: webpage)
//To facilitate communication between them, we need a service worker as a mediator, which is background.js


//One of the errors: unable to stablish connection with popup.html because chrom.action.onCluck wouldn't work if there's a specified popup
//https://developer.chrome.com/docs/extensions/reference/api/action#event-onClicked
//So try to embedded the html code into this js file
//React/ Vue?