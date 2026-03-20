document.addEventListener('DOMContentLoaded', function () {
  var toc = document.getElementById('markdown-toc');
  var drawer = document.getElementById('toc-drawer');
  var tocHeader = document.getElementById('toc-header');

  if (!toc || !drawer || !tocHeader) return;

  // Toggle drawer visibility when header is clicked
  tocHeader.addEventListener('click', function () {
    drawer.classList.toggle('js-hidden');
  });

  // Highlight active section on scroll
  var headings = document.querySelectorAll('article h1[id], article h2[id], article h3[id], article h4[id], article h5[id], article h6[id]');
  if (headings.length === 0) return;

  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY || document.documentElement.scrollTop;
    var viewMid = scrollPos + window.innerHeight / 2;
    var activeId = null;

    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top + scrollPos <= viewMid) {
        activeId = heading.id;
      }
    });

    if (activeId) {
      toc.querySelectorAll('a').forEach(function (link) {
        link.classList.remove('header-active');
      });
      var activeLink = toc.querySelector('a[href="#' + activeId + '"]');
      if (activeLink) {
        activeLink.classList.add('header-active');
      }
    }
  });

  // Smooth scrolling for TOC links
  toc.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var target = document.getElementById(this.getAttribute('href').slice(1));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', this.getAttribute('href'));
      }
    });
  });
});
