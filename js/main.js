const charButtonsDisplay = document.querySelector(".character");
const jobButtonsDisplay = document.querySelector(".side-job");
const sectDisplay = document.querySelector(".sect");
const sideJobDisplay = document.querySelector(".job");
const characterDisplay = document.querySelector(".character-name");
const poolTotalDisplay = document.querySelector(".pool-total");
const currentPoolDisplay = document.querySelector(".current-pool");
const phaseDisplay = document.querySelector(".phase-control");

const meditation = document.querySelector(".meditation");
const foundation = document.querySelector(".foundation");
const virtuoso = document.querySelector(".virtuoso");
const immortality = document.querySelector(".immortality");
const incarnation = document.querySelector(".incarnation");

const phaseList = [
  "Meditation",
  "Foundation",
  "Virtuoso",
  "Immortality",
  "Incarnation",
];

let currentSect = "";
let currentJob = "";
let currentPhase = 0;

characterList.forEach((char, i) => {
  const btn = document.createElement("img");
  btn.src = images[char.name];
  btn.key = i;

  btn.addEventListener("click", () => {
    currentSect = char.sect;
    sectDisplay.innerText = char.sect;
    characterDisplay.innerText = char.name;
    renderCardPoolControl(currentSect, currentJob);
  });

  charButtonsDisplay.appendChild(btn);
});

sideJobList.forEach((job, i) => {
  const btn = document.createElement("img");
  btn.src = images[job];
  btn.key = i;

  btn.addEventListener("click", () => {
    currentJob = job;
    sideJobDisplay.innerText = job;
    renderCardPoolControl(currentSect, currentJob);
  });

  jobButtonsDisplay.appendChild(btn);
});

function findPoolTotal(sectName, jobName) {
  // edit this to only count up to the current phase you are in, updating when the phase goes up
  let total = 0;
  let current = 0;

  let sectCards = findCards(sectName);
  let jobCards = findCards(jobName);

  total += sectCards.reduce((a, b) => a + b.current, 0);
  total += jobCards.reduce((a, b) => a + b.current, 0);

  return [current, total];
}

function findCards(search) {
  switch (search) {
    case "Cloud Sword Sect":
      return cloudSword;
    case "Hepstar Pavillion":
      return hepstarPavillion;
    case "Five Elements Alliance":
      return fiveElements;
    case "Duan Xuan Sect":
      return duanXuan;
    case "Elixirist":
      return elixirist;
    case "Fuluist":
      return fuluist;
    case "Painter":
      return painter;
    case "Musician":
      return musician;
    case "Formation Master":
      return formationMaster;
    case "Plant Master":
      return plantMaster;
    default:
      break;
  }
}

function renderCardPoolControl(char, job) {
  if (char && job) {
    let pool = findPoolTotal(char, job);

    poolTotalDisplay.innerText = pool[1];
    currentPoolDisplay.innerText = pool[0];

    const phase = document.createElement("h2");
    phase.innerText = phaseList[currentPhase];

    const reset = document.createElement("button");
    const increment = document.createElement("button");

    reset.innerText = "Reset";
    increment.innerText = "Breakthrough";

    reset.addEventListener("click", () => resetPhase(phase));

    increment.addEventListener("click", () => incrementPhase(phase));

    reset.classList.add("inline");
    phase.classList.add("inline");
    increment.classList.add("inline");

    phaseDisplay.innerHTML = "";
    phaseDisplay.appendChild(reset);
    phaseDisplay.appendChild(phase);
    phaseDisplay.appendChild(increment);

    renderCardPool();
  }
}

function splitCardPool() {
  const cardsByPool = [];
  const cards = findCurrentPoolList();

  currentPool = cards.reduce((a, b) => a + b.current, 0);

  if (currentPhase >= 0) {
    cardsByPool.push(cards.filter((card) => card.phase === 1));
  }

  if (currentPhase >= 1) {
    cardsByPool.push(cards.filter((card) => card.phase === 2));
  }

  if (currentPhase >= 2) {
    cardsByPool.push(cards.filter((card) => card.phase === 3));
  }

  if (currentPhase >= 3) {
    cardsByPool.push(cards.filter((card) => card.phase === 4));
  }

  if (currentPhase >= 4) {
    cardsByPool.push(cards.filter((card) => card.phase === 5));
  }

  currentPoolDisplay.innerText = currentPool;

  return cardsByPool;
}

function renderCardPool() {
  meditation.innerHTML = "";
  foundation.innerHTML = "";
  virtuoso.innerHTML = "";
  immortality.innerHTML = "";
  incarnation.innerHTML = "";

  const cards = splitCardPool();

  cards.forEach((phase, index) => {
    let currentParent;

    switch (index) {
      case 0:
        currentParent = meditation;
        break;
      case 1:
        currentParent = foundation;
        break;
      case 2:
        currentParent = virtuoso;
        break;
      case 3:
        currentParent = immortality;
        break;
      case 4:
        currentParent = incarnation;
        break;
      default:
        break;
    }

    phase.forEach((card) => {
      const container = document.createElement("div");
      const image = document.createElement('img');
      const text = document.createElement('p');

      container.classList.add("counter-display");
      text.innerText = `${card.name} x${card.current}`;

      image.src = '../assets/example-card.png';
      image.classList.add('card-image');

      container.addEventListener('click', () => {
        card.current > 0 ? card.current-- : card.current;
        renderCardPool();
      });

      container.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        card.current > 1 ? card.current -= 2 : card.current = 0;
        renderCardPool();
      })

      container.appendChild(image);
      container.appendChild(text);
      currentParent.appendChild(container);
    });
  });
}

function resetPhase(el) {
  resetPool();
  currentPhase = 0;
  el.innerText = phaseList[currentPhase];
  renderCardPool();
}

function resetPool() {
  // go through each phase of the cards and reset the values, exceptions for count are talent elixir, great bodybuilding, and enlightenment elixir
  const cards = splitCardPool();

  console.log({ cards });

  cards.forEach(phase => {
    phase.forEach(card => {
      card.current = card.max;
    })
  })
}

function incrementPhase(el) {
  currentPhase < 4 ? (currentPhase += 1) : (currentPhase = 4);
  el.innerText = phaseList[currentPhase];
  renderCardPool();
}

function findCurrentPoolList() {
  const sectCardList = findCards(currentSect);
  const jobCardList = findCards(currentJob);
  const cards = [...sectCardList, ...jobCardList];
  return cards.filter((card) => card.phase <= currentPhase + 1);
}
