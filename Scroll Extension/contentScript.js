let isCountdownRunning = false;

function enableScrollLimit() {
  document.addEventListener("scroll", handleScroll);
}

function disableScrollLimit() {
  document.removeEventListener("scroll", handleScroll);
}

function handleScroll() {
  const scrollPosition = window.scrollY;
  const scrollHeight = document.body.scrollHeight;
  if (scrollPosition >= scrollHeight - window.innerHeight && !isCountdownRunning) {
    startCountdown();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "enableScrollLimit") {
    enableScrollLimit();
  } else if (request.action === "disableScrollLimit") {
    disableScrollLimit();
  } else if (request.action === "startCountdown") {
    startCountdown();
  }
});

function startCountdown() {
  isCountdownRunning = true;

  // Show countdown
  const countdownElement = document.createElement("div");
  countdownElement.textContent = "10";
  countdownElement.style.position = "fixed";
  countdownElement.style.top = "50%";
  countdownElement.style.left = "50%";
  countdownElement.style.transform = "translate(-50%, -50%)";
  countdownElement.style.fontSize = "48px";
  countdownElement.style.color = "white";
  countdownElement.style.backgroundColor = "black";
  countdownElement.style.padding = "20px";
  document.body.appendChild(countdownElement);

  // Start countdown
  let countdown = 10;
  const intervalId = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown.toString();
    if (countdown === 0) {
      clearInterval(intervalId);
      // Hide countdown
      countdownElement.remove();
      isCountdownRunning = false;
    }
  }, 1000);

  // Prevent scrolling
  document.body.style.overflow = "hidden";

  // Re-enable scrolling after countdown finishes
  setTimeout(() => {
    document.body.style.overflow = "auto";
  }, 10000);
}