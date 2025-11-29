const snowLayer = document.querySelector('.snow');
const rainLayer = document.querySelector('.rain');
const snowMusic = document.getElementById('snowMusic');
const rainMusic = document.getElementById('rainMusic');
const moon = document.querySelector('.moon');

let current = 'snow';
let snowCount = 120;
let rainDuration = 1000;

function playMusic(type){
  snowMusic.pause();
  rainMusic.pause();
  snowMusic.currentTime = 0;
  rainMusic.currentTime = 0;

  if(type==='snow'){ snowMusic.volume=0.4; snowMusic.play().catch(()=>{}); }
  else { rainMusic.volume=0.4; rainMusic.play().catch(()=>{}); }
}

// ✨ Сайжруулсан Snow generator
function spawnSnow(count){
  snowLayer.innerHTML='';
  for(let i=0;i<count;i++){
    const f=document.createElement('div');
    f.className='flake';

    const depth = Math.random();
    let size = 2 + Math.random() * 5;

    if(depth < 0.3) size *= 0.6;
    else if(depth > 0.7) size *= 1.5;

    f.style.width = size+'px';
    f.style.height = size+'px';

    f.style.left = Math.random()*100+'vw';

    const fall = 6 + Math.random()*10;
    f.style.animationDuration = fall+'s';

    f.style.animationDelay = (-Math.random()*10)+'s';

    snowLayer.appendChild(f);
  }
}

// ✨ Cinematic Rain Generator
function spawnRain(count = 180) {
  rainLayer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'drop';

    // Depth layer (real effect)
    const depth = Math.random();
    let speed = (rainDuration / 1300) * (0.6 + Math.random() * 0.9);

    if (depth < 0.3) speed *= 1.4;   // near
    else if (depth > 0.7) speed *= 0.7; // far

    // Position
    d.style.left = Math.random() * 100 + 'vw';
    d.style.top = -(Math.random() * 20) + 'vh';

    d.style.animation = `rainFall ${speed}s linear`;
    
    // Custom drop animation
    const dropHeight = 120 + Math.random() * 80;

    d.animate(
      [
        { transform: `translateY(0px) rotate(12deg)` },
        { transform: `translateY(${dropHeight}vh) rotate(12deg)` }
      ],
      {
        duration: speed * 1000,
        iterations: Infinity,
      }
    );

    // Splash effect when drop hits bottom
    d.addEventListener('animationiteration', () => {
      const sp = document.createElement('div');
      sp.className = 'splash';
      sp.style.left = d.style.left;
      sp.style.bottom = '2vh';
      rainLayer.appendChild(sp);

      setTimeout(() => sp.remove(), 250);
    });

    rainLayer.appendChild(d);
  }
}


function setMoonForSeason(season){
  if(season==='snow'){
    moon.style.background='radial-gradient(circle at 30% 30%, #fffaf0 0%, #f0e6bf 60%, rgba(255,240,200,0.2) 100%)';
    moon.style.boxShadow='0 0 40px 10px rgba(255,240,200,0.3)';
  } else {
    moon.style.background='radial-gradient(circle at 30% 30%, #fffaf0 0%, #f0e6bf 50%, rgba(255,240,200,0.05) 100%)';
    moon.style.boxShadow='0 0 20px 5px rgba(255,240,200,0.1)';
  }
}

// Toggle
document.getElementById('toggleSeason').addEventListener('click',()=>{
  if(current==='snow'){
    current='rain';
    snowLayer.style.display='none';
    rainLayer.style.display='block';
    spawnRain(160);
  } else {
    current='snow';
    rainLayer.style.display='none';
    snowLayer.style.display='block';
    spawnSnow(snowCount);
  }
  playMusic(current);
  setMoonForSeason(current);
});

// Sliders
document.getElementById('snowRange').addEventListener('input',(e)=>{
  snowCount=parseInt(e.target.value);
  if(current==='snow') spawnSnow(snowCount);
});

document.getElementById('rainRange').addEventListener('input',(e)=>{
  rainDuration=parseInt(e.target.value);
  if(current==='rain') spawnRain(160);
});

// Init
spawnSnow(snowCount);
rainLayer.style.display='none';
playMusic('snow');
setMoonForSeason('snow');
