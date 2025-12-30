document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('open-blog');
  const postsWrap = document.getElementById('posts');

  // ❗ BUKAN HOMEPAGE → STOP
  if (!btn || !postsWrap) return;

  const posts = document.querySelectorAll('.post');

  function showHome() {
    btn.style.display = '';
    postsWrap.style.display = 'none';

    posts.forEach(p => {
      p.style.display = '';
      p.querySelector('.post-content').style.display = 'none';
      p.querySelector('.post-excerpt').style.display = '';
    });
  }

  function showList() {
    btn.style.display = 'none';
    postsWrap.style.display = '';
  }

  function showPost(url) {
    showList();

    posts.forEach(p => {
      const isTarget = p.dataset.url === url;
      p.style.display = isTarget ? '' : 'none';
      p.querySelector('.post-content').style.display = isTarget ? '' : 'none';
      p.querySelector('.post-excerpt').style.display = isTarget ? 'none' : '';
    });
  }

  btn.addEventListener('click', () => {
    location.hash = 'blog';
  });

  posts.forEach(post => {
    const link = post.querySelector('a');
    link.addEventListener('click', e => {
      e.preventDefault();
      history.pushState({ post: post.dataset.url }, '', post.dataset.url);
      showPost(post.dataset.url);
    });
  });

  function router() {
    const path = location.pathname;
    const hash = location.hash;

    if (hash === '#blog') {
      showList();
      return;
    }

    const post = [...posts].find(p => p.dataset.url === path);
    if (post) {
      showPost(path);
      return;
    }

    showHome();
  }

  window.addEventListener('popstate', router);
  window.addEventListener('hashchange', router);

  router();
});
