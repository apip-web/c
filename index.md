---
layout: default
---
# Selamat Datang di Situs Saya

Ini adalah blog pribadi saya tentang teknologi dan coding.

## Artikel Terbaru

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

## Tentang Saya

Saya seorang pengembang web yang suka eksperimen dengan Jekyll dan HTML/CSS.

<h2>Daftar Postingan</h2>

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a> — {{ post.date | date: "%d %b %Y" }}
  </li>
{% endfor %}
</ul>
