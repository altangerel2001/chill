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

function spawnRain(count=100){
  rainLayer.innerHTML='';
  for(let i=0;i<count;i++){
    const d=document.createElement('div');
    d.className='drop';
    d.style.left=Math.random()*100+'vw';

    const dur = (rainDuration/1000)*(0.5+Math.random()*1.2);
    d.style.animationDuration = dur+'s';
    d.style.animationDelay = (-Math.random()*2)+'s';

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
