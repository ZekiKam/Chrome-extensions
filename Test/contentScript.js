let interruptEnabled = false;
let previousUrl = location.href;

function showInterruptScreen() {
    const interruptDiv = document.createElement('div');
    interruptDiv.style.position = 'fixed';
    interruptDiv.style.top = '0';
    interruptDiv.style.left = '0';
    interruptDiv.style.width = '100%';
    interruptDiv.style.height = '100%';
    interruptDiv.style.backgroundColor = 'black';
    interruptDiv.style.color = 'white';
    interruptDiv.style.zIndex = '9999';
    interruptDiv.style.display = 'flex';
    interruptDiv.style.justifyContent = 'center';
    interruptDiv.style.alignItems = 'center';
    interruptDiv.style.fontSize = '2rem';
    interruptDiv.innerText = 'Wait for 5 seconds...';

    document.body.appendChild(interruptDiv);

    

    setTimeout(() => {
        document.body.removeChild(interruptDiv);
    }, 5000);
}

function checkForUrlChange() {
    const currentUrl = location.href;
    if (interruptEnabled && currentUrl !== previousUrl) {
        previousUrl = currentUrl;
        showInterruptScreen();
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableInterrupt") {
        interruptEnabled = true;
        previousUrl = location.href;
        showInterruptScreen();
    } else if (message.action === "disableInterrupt") {
        interruptEnabled = false;
    }
});

setInterval(checkForUrlChange, 1000);
