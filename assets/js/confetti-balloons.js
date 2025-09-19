
(function(){
  const root = document.createElement('div');
  root.style.position='fixed'; root.style.inset='0'; root.style.pointerEvents='none'; root.style.zIndex='9998';
  document.body.appendChild(root);
  function spawn(){
    for(let i=0;i<20;i++){
      const s=document.createElement('span');
      s.textContent = Math.random()<0.6 ? '🎈' : '✨';
      s.style.position='absolute';
      s.style.left=(Math.random()*100)+'%';
      s.style.top='-40px';
      s.style.fontSize=(16+Math.random()*18)+'px';
      s.style.filter='drop-shadow(0 2px 2px rgba(0,0,0,.15))';
      root.appendChild(s);
      const dur=4000+Math.random()*3000;
      const start=performance.now();
      const drift=(Math.random()*80-40);
      (function anim(t){
        const p=(t-start)/dur;
        if(p>=1){ s.remove(); return; }
        s.style.transform = `translate(${drift*p}px, ${p*110}vh) rotate(${p*360}deg)`;
        requestAnimationFrame(anim);
      })(start);
    }
  }
  spawn(); setTimeout(spawn, 1500);
})();