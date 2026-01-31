// soft pastel background colors
const colors = [
  "#fef9f3", // cream
  "#fce4ec", // soft pink
  "#e3eef9", // dusty blue
  "#e8f5e9", // sage
  "#f3e5f5"  // lavender
];

let clickCount = 0;
const maxClicks = 7;
const maxMessageRetryAttempts = 5;

// track current background color explicitly
let currentBackgroundColor = colors[0];

const messageEl = document.getElementById("message");
const btn = document.getElementById("btn");

// get a random item from an array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// get a random color that's different from current
function getRandomColor(currentColor) {
  const availableColors = colors.filter(c => c !== currentColor);
  return getRandomItem(availableColors);
}

// change message with fade transition
function changeMessage(newMessage) {
  messageEl.classList.add("fade");
  
  setTimeout(() => {
    messageEl.textContent = newMessage;
    messageEl.classList.remove("fade");
  }, 300);
}

// change background color
function changeBackground() {
  const newColor = getRandomColor(currentBackgroundColor);
  currentBackgroundColor = newColor;
  document.body.style.backgroundColor = newColor;
}

// handle button click
function handleClick() {
  clickCount++;
  
  if (clickCount >= maxClicks) {
    // show ending message
    changeMessage(getRandomItem(endingMessages));
    changeBackground();
    btn.disabled = true;
    btn.classList.add("hidden");
  } else {
    // show random message
    const currentMessage = messageEl.textContent;
    let newMessage = getRandomItem(messages);
    
    // try to get a different message
    let attempts = 0;
    while (newMessage === currentMessage && attempts < maxMessageRetryAttempts) {
      newMessage = getRandomItem(messages);
      attempts++;
    }
    
    changeMessage(newMessage);
    changeBackground();
  }
}

// initialize
function init() {
  messageEl.textContent = getRandomItem(messages);
  btn.addEventListener("click", handleClick);
}

init();
