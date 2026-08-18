const $=s=>document.querySelector(s);

$("#enterBtn").addEventListener("click",()=>$("#story").scrollIntoView({behavior:"smooth"}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})
},{threshold:.12});
document.querySelectorAll(".memory-card,.map-copy,.fake-map,.music-card,.voice-card,.letter").forEach(el=>{
  el.classList.add("reveal"); revealObserver.observe(el);
});

const music=$("#music"), play=$("#playMusic");
play.addEventListener("click",async()=>{
  if(music.paused){try{await music.play();play.textContent="Ⅱ"}catch{alert("Add your music as assets/music.mp3 first.")}}
  else{music.pause();play.textContent="▶"}
});
music.addEventListener("ended",()=>play.textContent="▶");

const voice=$("#voice"), voiceBtn=$("#voiceBtn"), voiceTime=$("#voiceTime");
voiceBtn.addEventListener("click",async()=>{
  if(voice.paused){try{await voice.play();voiceBtn.textContent="playing • tap to pause"}catch{alert("Add your voice recording as assets/voice.mp3 first.")}}
  else{voice.pause();voiceBtn.textContent="tap to listen"}
});
voice.addEventListener("timeupdate",()=>{
  const s=Math.floor(voice.currentTime),m=Math.floor(s/60),ss=String(s%60).padStart(2,"0");
  voiceTime.textContent=`${m}:${ss}`;
});
voice.addEventListener("ended",()=>voiceBtn.textContent="tap to listen");

const map=$("#map");let zoom=1;
$("#zoomIn").onclick=()=>{zoom=Math.min(1.35,zoom+.1);map.style.transform=`scale(${zoom})`;};
$("#zoomOut").onclick=()=>{zoom=Math.max(.9,zoom-.1);map.style.transform=`scale(${zoom})`;};

const pin=$("#pin");let dragging=false,offsetX=0,offsetY=0;
pin.addEventListener("pointerdown",e=>{
  dragging=true;pin.setPointerCapture(e.pointerId);
  const r=pin.getBoundingClientRect();offsetX=e.clientX-r.left;offsetY=e.clientY-r.top;
});
pin.addEventListener("pointermove",e=>{
  if(!dragging)return;
  const r=map.getBoundingClientRect();
  pin.style.left=`${((e.clientX-r.left-offsetX)/r.width)*100}%`;
  pin.style.top=`${((e.clientY-r.top-offsetY)/r.height)*100}%`;
});
pin.addEventListener("pointerup",()=>dragging=false);
