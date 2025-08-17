"use strict";

const button = document.getElementById("new-quote");
const checkbox = document.getElementById("auto-play");
const autoPlayState = document.getElementById("auto-play-state");

async function fetchQuote() {
  const response = await fetch("http://127.0.0.1:3000");
  const quoteProperty = await response.json();
  return quoteProperty;
}

async function showNewQuote() {
  //   const quoteProperty = pickFromArray(quotes);
  const quoteProperty = await fetchQuote();
  const quoteTextP = document.querySelector("#quote");
  const quoteAuthorP = document.querySelector("#author");
  quoteTextP.innerText = `"${quoteProperty.quote}`;
  quoteAuthorP.innerText = `- ${quoteProperty.author}`;
}

// function autoPlay() {
//   if (checkbox.checked == true) {
//     const timerId = setInterval(showNewQuote, 6000);
//     autoPlayState.innerText = "auto-play: ON";
//   } else {
//     clearInterval(timerId);
//     autoPlayState.innerText = "auto-play: OFF";
//   }
// }

let timerId = null; // declare in outer scope

function autoPlay() {
  if (checkbox.checked) {
    if (!timerId) {
      // prevent multiple intervals stacking
      timerId = setInterval(showNewQuote, 600);
      autoPlayState.innerText = "auto-play: ON";
    }
  } else {
    clearInterval(timerId);
    timerId = null;
    autoPlayState.innerText = "auto-play: OFF";
    autoPlayState.style.display = "none";
  }
}

button.addEventListener("click", showNewQuote);
checkbox.addEventListener("click", autoPlay);

function pickFromArray(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

showNewQuote();
