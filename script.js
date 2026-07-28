const intro = document.getElementById('intro');
const tato = document.getElementById('tato');
const loaderUnit = document.getElementById('loaderUnit');
const loadingText = document.getElementById('loadingText');
const marked = document.getElementById('marked');
const sparkField = document.getElementById('sparkField');
const skipIntro = document.getElementById('skipIntro');
const replayIntro = document.getElementById('replayIntro');

let introTimers = [];

function clearIntroTimers() {
  introTimers.forEach(clearTimeout);
  introTimers = [];
}

function later(fn, delay) {
  const timer = setTimeout(fn, delay);
  introTimers.push(timer);
}

function makeSparks(count = 34) {
  sparkField.innerHTML = '';
  for (let i = 0; i < count; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    const angle = (Math.PI * 2 * i) / count;
    const distance = 120 + Math.random() * 280;
    spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
    spark.style.animationDelay = `${Math.random() * 0.18}s`;
    sparkField.appendChild(spark);
  }
}

function finishIntro() {
  intro.classList.add('hidden');
  sessionStorage.setItem('tatoIntroSeen', 'true');
}

function resetIntro() {
  clearIntroTimers();
  intro.classList.remove('hidden');
  tato.className = 'tato';
  loaderUnit.className = 'loader-unit';
  loadingText.textContent = 'LOADING...';
  marked.className = 'marked';
  sparkField.innerHTML = '';
}

function playIntro() {
  resetIntro();

  later(() => tato.classList.add('walking'), 900);
  later(() => tato.classList.add('marking'), 3300);
  later(() => {
    loaderUnit.classList.add('glitch');
    loadingText.textContent = 'L0@D!NG...';
  }, 3900);
  later(() => {
    loadingText.textContent = 'SYSTEM ERROR';
    makeSparks();
  }, 4550);
  later(() => {
    loaderUnit.style.opacity = '0';
    marked.classList.add('show');
  }, 5000);
  later(finishIntro, 6000);
}

skipIntro.addEventListener('click', finishIntro);
replayIntro.addEventListener('click', () => {
  loaderUnit.style.opacity = '1';
  playIntro();
});

if (sessionStorage.getItem('tatoIntroSeen') === 'true') {
  intro.classList.add('hidden');
} else {
  playIntro();
}
