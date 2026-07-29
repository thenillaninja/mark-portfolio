const intro = document.getElementById('intro');
const tato = document.getElementById('tato');
const loaderUnit = document.getElementById('loaderUnit');
const loadingText = document.getElementById('loadingText');
const introMessage = document.getElementById('introMessage');
const sparkField = document.getElementById('sparkField');
const pawTrail = document.getElementById('pawTrail');
const skipIntro = document.getElementById('skipIntro');
const replayIntro = document.getElementById('replayIntro');
const bootText = document.getElementById('bootText');

let introTimers = [];
let pawTimer = null;

function later(fn, delay) {
  const timer = window.setTimeout(fn, delay);
  introTimers.push(timer);
}

function clearIntroTimers() {
  introTimers.forEach(window.clearTimeout);
  introTimers = [];
  if (pawTimer) window.clearInterval(pawTimer);
  pawTimer = null;
}

function makePaw(x, y, rotation = 0, delay = 0) {
  const paw = document.createElement('span');
  paw.className = 'paw-print';
  paw.style.left = `${x}px`;
  paw.style.top = `${y}px`;
  paw.style.setProperty('--r', `${rotation}deg`);
  paw.style.animationDelay = `${delay}ms`;
  pawTrail.appendChild(paw);
  return paw;
}

function startWalkPaws() {
  const isMobile = window.innerWidth < 820;
  const startX = -10;
  const endX = window.innerWidth / 2 - (isMobile ? 120 : 165);
  const y = window.innerHeight * (isMobile ? 0.76 : 0.73);
  let index = 0;
  const total = Math.max(7, Math.floor((endX - startX) / 42));
  pawTimer = window.setInterval(() => {
    if (index >= total) {
      window.clearInterval(pawTimer);
      pawTimer = null;
      return;
    }
    const x = startX + index * ((endX - startX) / total);
    makePaw(x, y + (index % 2 ? 12 : -2), index % 2 ? 12 : -12);
    index += 1;
  }, 180);
}

function makeBurst(count = 76) {
  sparkField.innerHTML = '';
  const centerX = window.innerWidth / 2 + (window.innerWidth < 820 ? 20 : 82);
  const centerY = window.innerHeight / 2 + 24;
  for (let i = 0; i < count; i += 1) {
    const spark = document.createElement('span');
    spark.className = `spark ${i % 7 === 0 ? 'star' : i % 4 === 0 ? 'line' : ''}`;
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * Math.min(window.innerWidth * 0.46, 560);
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
    spark.style.setProperty('--s', `${2 + Math.random() * 8}px`);
    spark.style.setProperty('--d', `${0.65 + Math.random() * 0.85}s`);
    spark.style.setProperty('--rot', `${Math.random() * 180}deg`);
    spark.style.animationDelay = `${Math.random() * 0.15}s`;
    sparkField.appendChild(spark);
  }
}

function setMessage(text) {
  introMessage.textContent = text;
  introMessage.classList.remove('show');
  void introMessage.offsetWidth;
  introMessage.classList.add('show');
}

function finishIntro() {
  clearIntroTimers();
  document.body.classList.remove('intro-running');
  intro.classList.add('hidden');
  sessionStorage.setItem('tatoIntroSeen', 'true');
}

function resetIntro() {
  clearIntroTimers();
  document.body.classList.add('intro-running');
  intro.classList.remove('hidden');
  tato.className = 'tato';
  loaderUnit.className = 'loader-unit';
  loaderUnit.style.opacity = '1';
  loadingText.textContent = 'LOADING...';
  bootText.textContent = 'INITIALIZING PORTFOLIO';
  introMessage.className = 'intro-message';
  sparkField.innerHTML = '';
  pawTrail.innerHTML = '';
}

function playIntro() {
  resetIntro();

  later(() => {
    startWalkPaws();
    tato.classList.add('walking');
  }, 550);

  later(() => {
    tato.classList.remove('walking');
    tato.classList.add('focused');
    setMessage('TARGET ACQUIRED.');
    bootText.textContent = 'UNEXPECTED PROCESS DETECTED';
  }, 3100);

  later(() => {
    tato.classList.add('sniffing');
  }, 3900);

  later(() => {
    loaderUnit.classList.add('teased');
    loadingText.textContent = 'CATCH ME.';
  }, 4450);

  later(() => {
    tato.classList.remove('sniffing');
    tato.classList.add('pawing');
    loaderUnit.classList.remove('teased');
    loaderUnit.classList.add('tapped');
    loadingText.textContent = 'AGAIN.';
  }, 5050);

  later(() => {
    tato.classList.remove('pawing');
    tato.classList.add('crouching');
    loaderUnit.classList.remove('tapped');
    loaderUnit.classList.add('rapid');
    loadingText.textContent = 'GAME ON';
    setMessage('FULL FOCUS.');
  }, 5900);

  later(() => {
    tato.classList.remove('crouching');
    tato.classList.add('pouncing');
    loaderUnit.classList.remove('rapid');
    loaderUnit.classList.add('doomed');
    bootText.textContent = 'IMPACT IMMINENT';
  }, 6900);

  later(() => {
    loaderUnit.style.opacity = '0';
    makeBurst();
    loadingText.textContent = 'SYSTEM OVERRIDDEN';
  }, 7440);

  later(() => {
    tato.classList.remove('pouncing');
    tato.classList.add('sit');
    setMessage('PORTFOLIO UNLOCKED.');
    bootText.textContent = 'WELCOME, HUMAN';
  }, 8050);

  later(() => {
    tato.classList.remove('sit');
    tato.classList.add('exit');
    const baseY = window.innerHeight * (window.innerWidth < 820 ? 0.77 : 0.74);
    const startX = window.innerWidth / 2 + 35;
    for (let i = 0; i < 9; i += 1) {
      const paw = makePaw(startX + i * 48, baseY + (i % 2 ? 12 : -1), i % 2 ? 13 : -10, i * 100);
      paw.classList.add('exit-paw');
    }
  }, 8850);

  later(() => {
    document.querySelectorAll('.paw-print').forEach(paw => paw.classList.add('fade'));
  }, 10100);

  later(finishIntro, 10850);
}

skipIntro.addEventListener('click', finishIntro);
replayIntro.addEventListener('click', playIntro);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('tatoIntroSeen') === 'true') {
  intro.classList.add('hidden');
} else {
  playIntro();
}
