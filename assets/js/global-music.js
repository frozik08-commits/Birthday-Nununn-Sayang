
(function(){
  if (window.__globalMusicInit) return; window.__globalMusicInit = true;
  const MUSIC_SRC = (window.MUSIC_SRC_OVERRIDE || "assets/music/lagu_badai_telah_berlalu.mp3");
  const key='hanin_music_state_v1';
  const state = JSON.parse(localStorage.getItem(key) || '{"time":0,"playing":false}');
  const audio = new Audio(MUSIC_SRC);
  audio.loop = true;
  audio.currentTime = state.time||0;
  if (state.playing) { audio.play().catch(()=>{}); }

  function save(){ localStorage.setItem(key, JSON.stringify({time: audio.currentTime, playing: !audio.paused})); }
  setInterval(()=>{ if (!audio.paused) save(); }, 1500);
  audio.addEventListener('pause', save); audio.addEventListener('play', save);

  const btn = document.createElement('button');
  btn.setAttribute('aria-label','Music');
  btn.style.position='fixed'; btn.style.right='16px'; btn.style.bottom='16px';
  btn.style.zIndex='9999'; btn.style.border='0'; btn.style.padding='12px 14px';
  btn.style.borderRadius='999px'; btn.style.boxShadow='0 6px 18px rgba(0,0,0,.15)';
  btn.style.background='linear-gradient(135deg,#ff69b4,#ffa5d8)'; btn.style.color='#fff';
  btn.style.fontWeight='700'; btn.style.cursor='pointer';
  btn.style.display='flex'; btn.style.alignItems='center'; btn.style.gap='8px';
  function render(){ btn.innerHTML = stateIcon() + (audio.paused ? ' Putar Musik' : ' Jeda Musik'); }
  function stateIcon(){ return audio.paused ? '▶️' : '⏸️'; }
  btn.onclick = function(){
    if (audio.paused) { audio.play().catch(()=>{}); }
    else { audio.pause(); }
    setTimeout(()=>{ save(); render(); }, 100);
  };
  render();
  document.body.appendChild(btn);
  // Sync icon on visibility change
  document.addEventListener('visibilitychange', ()=>setTimeout(render,200));
})();