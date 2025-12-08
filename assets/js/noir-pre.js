(function(){
  function detectLang(pre, codeEl){
    let m=(codeEl.className||'').match(/language-([\w-]+)/i);
    if(m)return m[1].toLowerCase();
    m=(pre.className||'').match(/language-([\w-]+)/i);
    if(m)return m[1].toLowerCase();
    let a=pre.parentElement;
    while(a){
      m=(a.className||'').match(/language-([\w-]+)/i);
      if(m)return m[1].toLowerCase();
      a=a.parentElement;
    }
    if(codeEl.dataset&&codeEl.dataset.lang)return codeEl.dataset.lang;
    if(pre.dataset&&pre.dataset.lang)return pre.dataset.lang;
    return 'code';
  }

  function createHeader(lang){
    const h=document.createElement('div');
    h.className='code-header';
    const l=document.createElement('div');
    l.className='lang';
    l.textContent=lang;
const b=document.createElement('button');
b.type='button';
b.className='copy-btn';
b.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"></rect><rect x="3" y="3" width="12" height="12" rx="2"></rect></svg><span>Copy</span>';

b.addEventListener('click',function(){
  const box=this.closest('.code-box');
  const pre=box&&box.querySelector('pre');
  if(!pre)return;

  const t=pre.innerText.replace(/\r/g,'');

  navigator.clipboard.writeText(t).then(()=>{

    const old=this.innerHTML;
    this.classList.add('copied');

    // ⬇⬇ GANTI BAGIAN INI ⬇⬇
    this.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>Copied</span>
    `;
    // ⬆⬆ GANTI SAMPAI SINI ⬆⬆

    setTimeout(()=>{
      this.classList.remove('copied');
      this.innerHTML=old;
    },1600);

  }).catch(()=>{
    try{
      const r=document.createRange();
      r.selectNodeContents(pre);
      const s=window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    }catch(e){}
    alert('Copy failed — select manually');
  });
});

h.appendChild(l);
h.appendChild(b);
return h;
  }

  function wrapPre(pre){
    if(!pre||!pre.parentNode)return false;
    if(pre.closest('.code-box'))return false;
    const raw=(pre.textContent||'').replace(/\r/g,'').replace(/\n$/,'');
    if(!raw)return false;
    const lines=raw.split('\n');

    const box=document.createElement('div');
    box.className='code-box';

    const codeEl=pre.querySelector('code')||pre;
    const lang=detectLang(pre,codeEl);
    const head=createHeader(lang);

    const inner=document.createElement('div');
    inner.className='code-inner';

    const nums=document.createElement('div');
    nums.className='line-numbers';
    nums.innerHTML=lines.map((_,i)=>'<span>'+(i+1)+'</span>').join('');

    pre.parentNode.insertBefore(box,pre);
    box.appendChild(head);
    box.appendChild(inner);
    inner.appendChild(nums);
    inner.appendChild(pre);

    return true;
  }

  function processAll(){
    let c=0;
    document.querySelectorAll('pre').forEach(p=>{
      if(wrapPre(p))c++;
    });
    return c;
  }

  document.addEventListener('DOMContentLoaded',()=>{try{processAll();}catch(e){}});
  window.addEventListener('load',()=>{try{processAll();}catch(e){}});

  const mo=new MutationObserver(m=>{
    let any=false;
    m.forEach(x=>{
      x.addedNodes.forEach(n=>{
        if(!(n instanceof Element))return;
        if(n.matches&&n.matches('pre')){
          if(wrapPre(n))any=true;
        }else{
          n.querySelectorAll&&n.querySelectorAll('pre').forEach(p=>{
            if(wrapPre(p))any=true;
          });
        }
      });
    });
  });
  mo.observe(document.body,{childList:true,subtree:true});
})();
