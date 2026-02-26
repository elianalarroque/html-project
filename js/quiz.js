const preguntas = [
  {
    sonido: "https://www.myinstants.com/media/sounds/windows-xp-startup.mp3",
    opciones: [
      "Windows XP al encenderse",
      "Windows Vista al encenderse",
      "Windows XP al apagarse",
    ],
    respuesta: "Windows XP al encenderse",
  },

  {
    sonido: "https://www.myinstants.com/media/sounds/nudge.mp3",
    opciones: ["Error en Windows", "Zumbido en MSN", "Mensaje entrante en MSN"],
    respuesta: "Zumbido en MSN",
  },
  {
    sonido:
      "https://www.myinstants.com/media/sounds/skype-call-sound-download-link-mp3cut.mp3",
    opciones: [
      "Llamada entrante en FaceTime",
      "Llamada entrante en MSN",
      "Llamada entrante en Skype",
    ],
    respuesta: "Llamada entrante en Skype",
  },
  {
    sonido: "https://www.myinstants.com/media/sounds/windows-vista-startup.mp3",
    opciones: [
      "Windows Vista al encenderse",
      "Windows 10 al encenderse",
      "Windows XP al apagarse",
    ],
    respuesta: "Windows Vista al encenderse",
  },
  {
    sonido: "https://www.myinstants.com/media/sounds/1994-nokia-ringtone.mp3",
    opciones: [
      "Llamada entrante de Motorola",
      "Llamada entrante de Samsung",
      "Llamada entrante de Nokia",
    ],
    respuesta: "Llamada entrante de Nokia",
  },
  {
    sonido:
      "https://www.myinstants.com/media/sounds/windows-xp-critical-error-full-version.mp3",
    opciones: ["Zumbido MSN", "Error en Windows", "Skype llamando"],
    respuesta: "Error en Windows",
  },
  {
    sonido:
      "https://www.myinstants.com/media/sounds/8779c1600dd6d5e91103cb585ac30434.mp3",
    opciones: [
      "Notificacion en Windows",
      "Notificacion en Samsung",
      "Notificacion en MSN",
    ],
    respuesta: "Notificacion en Samsung",
  },
  {
    sonido: "https://www.myinstants.com/media/sounds/playstation-2-start.mp3",
    opciones: ["Nintendo DS", "Game Boy", "PlayStation 2"],
    respuesta: "PlayStation 2",
  },

  {
    sonido: "https://www.myinstants.com/media/sounds/cartoon_network_logo.mp3",
    opciones: ["Disney Channel", "Nickelodeon", "Cartoon Network"],
    respuesta: "Cartoon Network",
  },
  {
    sonido: "https://www.myinstants.com/media/sounds/looney-tunes-short.mp3",
    opciones: ["Tom y Jerry", "Looney Tunes", "Codename: Kids Next Door"],
    respuesta: "Looney Tunes",
  },
];

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz");
const resultsScreen = document.getElementById("results");
const qNum = document.getElementById("q-num");
const audioPlayer = document.getElementById("audio");
const optionsContainer = document.getElementById("options");
const scoreText = document.getElementById("score");
const feedbackText = document.getElementById("feedback");

let current = 0;
let score = 0;

function showScreen(screen) {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultsScreen.classList.remove("active");

  screen.classList.add("active");
}

function loadQuestion() {
  const q = preguntas[current];

  qNum.textContent = `Pregunta ${current + 1}/${preguntas.length}`;
  audioPlayer.src = q.sonido;

  optionsContainer.innerHTML = "";
  q.opciones.forEach((op) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.classList.add("btn");

    btn.addEventListener("click", () => {
      if (op === q.respuesta) score++;

      current++;
      if (current < preguntas.length) loadQuestion();
      else finishQuiz();
    });

    optionsContainer.appendChild(btn);
  });
}

function finishQuiz() {
  showScreen(resultsScreen);

  scoreText.textContent = `Acertaste ${score}/${preguntas.length}`;
  let keyword = "";
  if (score === preguntas.length || score >= 8) {
    keyword = "party";
    feedbackText.textContent = "✨ Eres una LEYENDA de los 2000 ✨";
  } else if (score >= preguntas.length / 2) {
    keyword = "not bad";
    feedbackText.textContent = "👌 Buen oído, te acuerdas de casi todas";
  } else {
    feedbackText.textContent = "🤔 Mmm… ¿seguro que viviste en los 2000?";
    keyword = "doubting";
  }
  searchGif(keyword).then((url) => {
    if (url) {
      showGif(url);
    } else {
      console.log("No se pudo cargar el GIF");
    }
  });
}

/*API de gifs para cuando muestra el resultado*/
const resultGifContainer = document.getElementById("result-gif");
const API_KEY = "xJgW0D3Z2PZD5WPpUYT1sIMW66r4aZsL";

async function searchGif(keyword) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=1&rating=g`
  );
  const data = await response.json();
  const gifUrl = data.data[0].images.original.url;
  return gifUrl;
}

function showGif(gifUrl) {
  resultGifContainer.innerHTML = `<img src="${gifUrl}" alt="resultado">`;
}

startBtn.addEventListener("click", () => {
  showScreen(quizScreen);
  current = 0;
  score = 0;
  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  showScreen(startScreen);
});

/* API de peliculas */

const searchBtn = document.getElementById("searchBtn");
const yearSelector = document.getElementById("yearSelector");
const movieContainer = document.getElementById("moviesContainer");
const MY_API_KEY = "70ad5182740b13f40b8fadfd303d0744";

searchBtn.addEventListener("click", () => {
  const yearSelected = yearSelector.value;
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&primary_release_year=${yearSelected}&sort_by=popularity.desc
`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      const moviesToShow = data.results.slice(0, 5);

      let moviesHTML = "";

      moviesToShow.forEach((movie) => {
        moviesHTML += `
        <div>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h3>${movie.title}</h3>
        </div>`;
      });

      movieContainer.innerHTML = moviesHTML;
    });
});
