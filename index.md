---
layout: default
---
<div class="homepage">
  <h2>Selamat Datang di Situs Saya</h2>

  <p>Ini adalah blog pribadi saya tentang teknologi dan coding.</p>

<hr>

<div id="lcd-countdown" style="text-align:center; margin:40px 0;">
  <h4>Countdown to New Year</h4>
  <div class="lcd-container">
    <div class="lcd-box"><span class="number">0</span><div class="label">DAYS</div></div>
    <div class="lcd-box"><span class="number">0</span><div class="label">HOURS</div></div>
    <div class="lcd-box"><span class="number">0</span><div class="label">MINUTES</div></div>
    <div class="lcd-box"><span class="number">0</span><div class="label">SECONDS</div></div>
  </div>
</div>

</div>

<hr>

<button id="show-blog">Lihat Blog</button>

<div id="posts" hidden>
  {% for post in site.posts %}
  <article class="post" data-url="{{ post.url | relative_url }}">
    <h2 class="post-title">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h2>

    <div class="post-excerpt">
      {{ post.excerpt }}
    </div>

    <div class="post-content" hidden>
      {{ post.content }}
    </div>
  </article>
  {% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('show-blog');
  const postsWrap = document.getElementById('posts');
  const posts = [...document.querySelectorAll('.post')];

  function showHome() {
    btn.hidden = false;
    postsWrap.hidden = true;

    posts.forEach(p => {
      p.hidden = false;
      p.querySelector('.post-content').hidden = true;
      p.querySelector('.post-excerpt').hidden = false;
    });
  }

  function showList() {
    btn.hidden = true;
    postsWrap.hidden = false;

    posts.forEach(p => {
      p.hidden = false;
      p.querySelector('.post-content').hidden = true;
      p.querySelector('.post-excerpt').hidden = false;
    });
  }

  function showPost(url) {
    btn.hidden = true;
    postsWrap.hidden = false;

    posts.forEach(p => {
      const isTarget = p.dataset.url === url;
      p.hidden = !isTarget;
      p.querySelector('.post-content').hidden = !isTarget;
      p.querySelector('.post-excerpt').hidden = isTarget;
    });
  }

  // Tombol "Lihat Blog"
  btn.addEventListener('click', () => {
    showList();
    history.pushState({ page: 'list' }, '', '/blog');
  });

  // Klik judul post
  posts.forEach(post => {
    const link = post.querySelector('.post-title a');

    link.addEventListener('click', e => {
      e.preventDefault();
      showPost(post.dataset.url);
      history.pushState({ page: 'post', url: post.dataset.url }, '', post.dataset.url);
    });
  });

  // BACK / FORWARD
  window.addEventListener('popstate', e => {
    if (!e.state) {
      showHome();
      return;
    }

    if (e.state.page === 'list') showList();
    if (e.state.page === 'post') showPost(e.state.url);
  });

  // INITIAL LOAD
  if (location.pathname !== '/' && location.pathname !== '/blog') {
    showPost(location.pathname);
  } else {
    showHome();
  }
});
</script>

<style>
.post-title a {
  cursor: pointer;
  color: #ff3366;
  text-decoration: none;
}

.post-excerpt {
  color: #555;
  margin-bottom: 1em;
}

.post-content {
  margin-bottom: 1em;
}
</style>

<script>
const lcdBoxes = document.querySelectorAll('.lcd-box .number');

function updateLCDCountdown() {
  const now = new Date();
  const nextYear = new Date(now.getFullYear()+1,0,1);
  const diff = nextYear - now;

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff/(1000*60*60)) % 24);
  const minutes = Math.floor((diff/(1000*60)) % 60);
  const seconds = Math.floor((diff/1000) % 60);

  const values = [days,hours,minutes,seconds];
  lcdBoxes.forEach((el,i)=> el.textContent = values[i]);
}

updateLCDCountdown();
setInterval(updateLCDCountdown,1000);
</script>
