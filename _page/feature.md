---
layout: default
---
# Site Feature

Text can be **bold**, _italic_, or ~~strikethrough~~.

[Link to another page](/page/another-page).

There should be whitespace between paragraphs.

There should be whitespace between paragraphs. We recommend including a README, or a file with information about your project.

# Header 1

This is a normal paragraph following a header. GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

## Header 2

> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.

### Header 3

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

<style>
.code-box{background:#1e1e1e;border:1px solid #444;border-radius:8px;overflow:hidden;margin:24px 0;font-size:14px;line-height:1.5}
.code-box .code-header{position:sticky;top:0;background:#202020;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #333;z-index:5;gap:12px}
.code-box .code-header .lang{font-size:12px;color:#87c1ff;text-transform:uppercase;letter-spacing:.04em}
.code-box .copy-btn{padding:5px 10px;font-size:12px;border:1px solid #333;background:#2a2a2a;color:#ccc;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:8px}
.code-box .copy-btn:hover{background:#2f2f2f;color:#fff}
.code-box .copy-btn.copied{background:#3a3a3a;color:#e6e6e6}
.code-box .code-inner{display:grid;grid-template-columns:auto 1fr;background:#1e1e1e}
.code-box .line-numbers{background:#252526;color:#858585;text-align:right;padding:12px 10px 12px 12px;user-select:none;border-right:1px solid #444;position:sticky;left:0;z-index:4;font-family:Consolas,Monaco,'Courier New',monospace;font-size:14px;line-height:1.5}
.code-box .line-numbers span{display:block;line-height:1.5}
.code-box pre{margin:0;padding:12px;overflow:auto;background:transparent}
.code-box pre code{display:block;white-space:pre;font-family:Consolas,Monaco,'Courier New',monospace;font-size:14px;line-height:1.5}
.code-box pre code *{white-space:pre}
.code-box pre code span:hover{background:rgba(255,255,255,.02)}
</style>

<script>
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
        this.innerHTML='✓ Copied';
        setTimeout(()=>{this.classList.remove('copied');this.innerHTML=old;},1600);
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
</script>

#### Header 4

*   This is an unordered list following a header.
*   This is an unordered list following a header.
*   This is an unordered list following a header.

##### Header 5

1.  This is an ordered list following a header.
2.  This is an ordered list following a header.
3.  This is an ordered list following a header.

###### Header 6

| head1        | head two          | three | head1        | head two          | three |
|:-------------|:------------------|:------|:-------------|:------------------|:------|
| ok           | good swedish fish | nice  | ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  | out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   | ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  | ok           | good `zoute` drop | yumm  |

### There's a horizontal rule below this.

* * *

### Here is an unordered list:

*   Item foo
*   Item bar
*   Item baz
*   Item zip

### And an ordered list:

1.  Item one
1.  Item two
1.  Item three
1.  Item four

### A button

<button id="btn">Klik saya</button>

<script>
document.getElementById("btn").addEventListener("click", () => {
  alert("Halo dari JS!");
});
</script>

### Small image

![Octocat](https://github.githubassets.com/images/icons/emoji/octocat.png)

### Large image

![Branching](https://i.postimg.cc/VvnwvXZ9/premium-photo-1700752853984-d3d1574aabd2.jpg)

### Definition lists can be used with HTML syntax.

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```
