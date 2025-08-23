"use strict";

const button = document.getElementById("new-quote");
const checkbox = document.getElementById("auto-play");
const autoPlayState = document.getElementById("auto-play-state");
const quoteContent = document.querySelector("#quoteContent");

async function fetchQuote() {
  try {
    const response = await fetch("http://127.0.0.1:3000");
    const quoteProperty = await response.json();
    return quoteProperty;
  } catch (err) {
    quoteContent.innerText = err;
  }
}

async function showNewQuote() {
  //   const quoteProperty = pickFromArray(quotes);
  const quoteProperty = await fetchQuote();
  const quoteTextP = document.querySelector("#quote");
  const quoteAuthorP = document.querySelector("#author");
  quoteTextP.innerText = `"${quoteProperty.quote}`;
  quoteAuthorP.innerText = `- ${quoteProperty.author}`;
}

///two versions of autoplay function, delete one

// function autoPlay() {
//   if (checkbox.checked == true) {
//     const timerId = setInterval(showNewQuote, 6000);
//     autoPlayState.innerText = "auto-play: ON";
//   } else {
//     clearInterval(timerId);
//     autoPlayState.innerText = "auto-play: OFF";
//   }
// }

let timerId = null;

function autoPlay() {
  if (checkbox.checked) {
    if (!timerId) {
      timerId = setInterval(showNewQuote, 600);
      autoPlayState.innerText = "auto-play: ON";
    }
  } else {
    clearInterval(timerId);
    timerId = null;
    autoPlayState.innerText = "auto-play: OFF";
  }
}

button.addEventListener("click", showNewQuote);
checkbox.addEventListener("click", autoPlay);

function pickFromArray(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

showNewQuote();

// ---- Form submission ----
const submitBtn = document.querySelector("#submitBtn");
const inputNewQuote = document.querySelector("#addQuote");
const inputNewAuthor = document.querySelector("#addAuthor");
const feedbackMessage = document.querySelector("#feedbackMessage");
const form = document.querySelector("form");

const postData = async (e) => {
  e.preventDefault();

  const quote = inputNewQuote.value.trim();
  const author = inputNewAuthor.value.trim();

  if (!quote || !author) {
    feedbackMessage.textContent = "Both quote and author are required.";
    setTimeout(() => (feedbackMessage.textContent = ""), 5000);
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:3000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, author }),
    });
    displayFeedback(res);
    inputNewQuote.value = "";
    inputNewAuthor.value = "";
  } catch (err) {
    console.error(err);
    feedbackMessage.textContent = err;
  }
};

const displayFeedback = async (res) => {
  const response = await res.text();
  feedbackMessage.textContent = response;
  setTimeout(() => (feedbackMessage.innerHTML = ""), 3000);
};

// submitBtn.addEventListener("click", postData);
form.addEventListener("submit", postData);
