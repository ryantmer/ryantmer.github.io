---
layout: default
---

<div class="home">

  {% for post in site.posts %}
    <article>
      <header>
        <h2><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h2>
        <p class="post-date">{{ post.date | date: "%Y-%m-%d"  }}</p>
      </header>
      {{ post.content }}
    </article>
    <hr />
  {% endfor %}

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

</div>
