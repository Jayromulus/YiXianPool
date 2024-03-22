const charButtons = document.querySelector('.character');
const jobButtons = document.querySelector('.side-job');
const sect = document.querySelector('.sect');
const sideJob = document.querySelector('.job');
const character = document.querySelector('.character-name');
const poolTotal = document.querySelector('.pool-total');

let currentSect = '';
let currentJob = '';

characterList.forEach((char, i) => { 
  const btn = document.createElement('button');
  btn.innerText = char.name;
  btn.key = i;

  btn.addEventListener('click', () => {
    currentSect = char.sect;
    sect.innerText = char.sect;
    character.innerText = char.name;
    renderCardPool(currentSect, currentJob);
  });

  charButtons.appendChild(btn);
});

sideJobList.forEach((job, i) => {
  const btn = document.createElement('button');
  btn.innerText = job;
  btn.key = i;

  btn.addEventListener('click', () => {
    currentJob = job;
    sideJob.innerText = job;
    renderCardPool(currentSect, currentJob);
  })

  jobButtons.appendChild(btn);
})

// console.log(findPoolTotal(cloudSword, elixirist))

function findPoolTotal(sectName, jobName) {
  // edit this to only count up to the current phase you are in, updating when the phase goes up
  let total = 0;

  console.log({sectName});
  let sectCards = findCards(sectName);
  let jobCards = findCards(jobName);

  total += sectCards.reduce((a, b) => a + b.current, 0);
  total += jobCards.reduce((a, b) => a + b.current, 0);

  return total;
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

function renderCardPool(char, job) {
  if(char && job) {
    let total = findPoolTotal(char, job);

    poolTotal.innerText = total;
  }
}