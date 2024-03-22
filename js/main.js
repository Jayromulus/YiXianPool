const charButtonsDisplay = document.querySelector('.character');
const jobButtonsDisplay = document.querySelector('.side-job');
const sectDisplay = document.querySelector('.sect');
const sideJobDisplay = document.querySelector('.job');
const characterDisplay = document.querySelector('.character-name');
const poolTotalDisplay = document.querySelector('.pool-total');
const currentPoolDisplay = document.querySelector('.current-pool');
const phaseDisplay = document.querySelector('.phase-control');

const phaseList = ['Meditation', 'Foundation', 'Virtuoso', 'Immortality', 'Incarnation'];

let currentSect = '';
let currentJob = '';
let currentPhase = 0;

characterList.forEach((char, i) => { 
  const btn = document.createElement('img');
  btn.src = images[char.name];
  btn.key = i;

  btn.addEventListener('click', () => {
    currentSect = char.sect;
    sectDisplay.innerText = char.sect;
    characterDisplay.innerText = char.name;
    renderCardPoolControl(currentSect, currentJob);
  });

  charButtonsDisplay.appendChild(btn);
});

sideJobList.forEach((job, i) => {
  const btn = document.createElement('img');
  btn.src = images[job];
  btn.key = i;

  btn.addEventListener('click', () => {
    currentJob = job;
    sideJobDisplay.innerText = job;
    renderCardPoolControl(currentSect, currentJob);
  })

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
    case 'Cloud Sword Sect':
      return cloudSword;
    case 'Hepstar Pavillion':
      return hepstarPavillion;
    case 'Five Elements Alliance':
      return fiveElements;
    case 'Duan Xuan Sect':
      return duanXuan;
    case 'Elixirist':
      return elixirist;
    case 'Fuluist':
      return fuluist;
    case 'Painter':
      return painter;
    case 'Musician':
      return musician;
    case 'Formation Master':
      return formationMaster;
    case 'Plant Master':
      return plantMaster;
    default:
      break;
  }
}

function renderCardPoolControl(char, job) {
  if(char && job) {
    let pool = findPoolTotal(char, job);

    poolTotalDisplay.innerText = pool[1];
    currentPoolDisplay.innerText = pool[0];

    const phase = document.createElement('h2');
    phase.innerText = phaseList[currentPhase];

    const reset = document.createElement('button');
    const increment = document.createElement('button');

    reset.innerText = 'Reset';
    increment.innerText = 'Breakthrough';

    reset.addEventListener('click', () => resetPhase(phase));

    increment.addEventListener('click', () => incrementPhase(phase));

    reset.classList.add('inline');
    phase.classList.add('inline');
    increment.classList.add('inline');

    phaseDisplay.innerHTML = '';
    phaseDisplay.appendChild(reset);
    phaseDisplay.appendChild(phase);
    phaseDisplay.appendChild(increment);

    renderCardPool();
  }
}

function renderCardPool() {
  const cards = findCurrentPoolList();
  currentPool = cards.reduce((a, b) => a + b.current, 0);

  console.log({ cards });

  currentPoolDisplay.innerText = currentPool;

  // reduce each phase on it's own, find each phase on it's own, render each phase individually
}

function resetPhase(el) {
  currentPhase = 0;
  el.innerText = phaseList[currentPhase];
  renderCardPool();
}

function incrementPhase(el) {
  currentPhase < 4 ? currentPhase += 1 : currentPhase = 4;
  el.innerText = phaseList[currentPhase];
  renderCardPool();
}

function findCurrentPoolList() {
  const sectCardList = findCards(currentSect);
  const jobCardList = findCards(currentJob);
  const cards = [...sectCardList, ...jobCardList];
  return cards.filter(card => card.phase <= currentPhase + 1);
}