const questions = [
  { prompt: "What's my favourite food?", answers: ["meat"], tease: "Really? You don't know what keeps me happy? 😂 Try again." },
  { prompt: "What's my shoe size?", answers: ["42"], tease: "Those shoes are clearly not paying attention. 👟😂" },
  { prompt: "What's my full name?", answers: ["bruce kimutai korir"], tease: "Come on now… you should know the whole government name. 😭" },
  { prompt: "What's my favourite animal?", answers: ["cat"], tease: "Not even close, detective. 🐈‍⬛ Try again!" },
  { prompt: "What's my biggest insecurity?", answers: ["height"], tease: "You know me better than that. Think again. 👀" },
  { prompt: "Who's my favourite person?", answers: ["sharon", "nita", "me"], tease: "Ouch. That's a dangerous answer to get wrong. 😭❤️" }
];

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const win = document.getElementById("win");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const answerInput = document.getElementById("answerInput");
const questionCount = document.getElementById("questionCount");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const hint = document.getElementById("hint");
const toast = document.getElementById("toast");
const prizeImage = document.getElementById("prizeImage");
const imageFallback = document.getElementById("imageFallback");
const whatsappBtn = document.getElementById("whatsappBtn");

let currentQuestion = 0;
let toastTimer;

function normalize(value) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

function showQuestion() {
  const item = questions[currentQuestion];
  questionCount.textContent = `QUESTION ${currentQuestion + 1} / ${questions.length}`;
  progressText.textContent = `${Math.round((currentQuestion / questions.length) * 100)}% complete`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionNumber.textContent = String(currentQuestion + 1).padStart(2, "0");
  questionText.textContent = item.prompt;
  hint.textContent = "One answer at a time, beautiful.";
  answerInput.value = "";
  answerInput.focus();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 2600);
}

function rejectAnswer() {
  const card = quiz;
  card.classList.remove("shake");
  void card.offsetWidth;
  card.classList.add("shake");
  showToast(questions[currentQuestion].tease);
  answerInput.select();
}

function celebrate() {
  quiz.classList.add("hidden");
  win.classList.remove("hidden");
  progressFill.style.width = "100%";
  progressText.textContent = "100% complete";

  // The photo should be named us.png and placed beside index.html.
  prizeImage.onload = () => {
    imageFallback.classList.add("hidden");
    prizeImage.classList.remove("reveal");
    void prizeImage.offsetWidth;
    prizeImage.classList.add("reveal");
  };
  prizeImage.onerror = () => {
    prizeImage.classList.add("hidden");
    imageFallback.classList.remove("hidden");
  };

  // Re-check in case the image loaded before the event handlers were attached.
  if (prizeImage.complete && prizeImage.naturalWidth > 0) {
    prizeImage.classList.remove("reveal");
    void prizeImage.offsetWidth;
    prizeImage.classList.add("reveal");
  }

  const message = encodeURIComponent("❤️ SHE WON! Your girl answered all 6 questions and unlocked the prize. 😍");
  whatsappBtn.href = `https://wa.me/254117425581?text=${message}`;
  burstHearts();
}

startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

submitBtn.addEventListener("click", () => {
  const response = normalize(answerInput.value);
  if (!response) {
    showToast("Don't leave me waiting… type an answer first. 😏");
    answerInput.focus();
    return;
  }

  const accepted = questions[currentQuestion].answers.some(answer => normalize(answer) === response);
  if (!accepted) {
    rejectAnswer();
    return;
  }

  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    celebrate();
  } else {
    showQuestion();
    showToast("That's right! Look at you. ❤️");
  }
});

answerInput.addEventListener("keydown", event => {
  if (event.key === "Enter") submitBtn.click();
});

function burstHearts() {
  const layer = document.querySelector(".hearts");
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "♥" : "❤";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heart.style.animationDelay = `${Math.random() * 1.5}s`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
  }
}

// Gentle floating hearts in the background.
setInterval(() => {
  const layer = document.querySelector(".hearts");
  if (layer.children.length > 18) return;
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 13}px`;
  heart.style.animationDuration = `${7 + Math.random() * 5}s`;
  layer.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}, 1100);
