// Check if the script has already been injected
if (window.myContentScriptInjected) {
    return;
}
window.myContentScriptInjected = true;

let previousUrl = location.href;
let interruptEnabled = false;
//let selectedOption = null;
let timeoutId = null;




function showInterruptScreen(option) {
    // Ensure any previous interruption is cleared
    clearInterruptScreen();

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

    if (option === "countdown") {
        interruptDiv.innerText = 'Wait for 5 seconds...';
        timeoutId = setTimeout(() => {
            clearInterruptScreen();
        }, 5000);

    } else if (option === "quote") {
        fetch(chrome.runtime.getURL('quotes.json'))
            .then(response => response.json())
            .then(data => {
                const randomQuote = data[Math.floor(Math.random() * data.length)];
                const quoteText = data.quote;
                const quoteAuthor = data.author;
                interruptDiv.innerText = `${quoteText}\n— ${quoteAuthor}`;
                timeoutId = setTimeout(() => {
                    clearInterruptScreen();
                }, 5000);
            });

    } else if (option === "quit"){
        clearInterruptScreen()
        }
    
    document.body.appendChild(interruptDiv);
}


function clearInterruptScreen() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    const interruptDiv = document.querySelector('div');
    if (interruptDiv) {
        document.body.removeChild(interruptDiv);
    }
}

function checkForUrlChange() {
    const currentUrl = location.href;
    if (interruptEnabled && currentUrl !== previousUrl) {
        previousUrl = currentUrl;
        showInterruptScreen(message.option);
    }
}





//Main
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "enableInterrupt") {
        interruptEnabled = true;
        previousUrl = location.href;
        showInterruptScreen(message.option);
    } else if (message.action === "disableInterrupt") {
        clearInterruptScreen();
    }
});

setInterval(checkForUrlChange, 1000);

