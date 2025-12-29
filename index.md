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

<hr>

<div id="posts">
  {% for post in site.posts %}
    <article class="post" data-url="{{ post.url | relative_url }}" data-tags="{{ post.tags | join: ',' }}">
      <!-- Judul -->
      <h2 class="post-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>

      <!-- Excerpt -->
      <div class="post-excerpt">
        {{ post.excerpt }}
      </div>

      <!-- Konten penuh (disembunyikan) -->
      <div class="post-content" style="display:none;">
        {{ post.content }}
      </div>
    </article>
  {% endfor %}
</div>

<script>
document.addEventListener('click', function(e) {
  const link = e.target.closest('.post-title a');
  if (!link) return;

  e.preventDefault(); // cegah reload

  const article = link.closest('article');
  const content = article.querySelector('.post-content');
  const excerpt = article.querySelector('.post-excerpt');

  // toggle konten
  if (content.style.display === 'none') {
    content.style.display = '';
    excerpt.style.display = 'none';
    history.pushState(null, '', link.getAttribute('href'));
  } else {
    content.style.display = 'none';
    excerpt.style.display = '';
  }
});

// handle back/forward browser
window.addEventListener('popstate', () => {
  document.querySelectorAll('.post').forEach(post => {
    const url = post.dataset.url;
    const content = post.querySelector('.post-content');
    const excerpt = post.querySelector('.post-excerpt');

    if (location.pathname === url) {
      content.style.display = '';
      excerpt.style.display = 'none';
    } else {
      content.style.display = 'none';
      excerpt.style.display = '';
    }
  });
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

</div>

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
