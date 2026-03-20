document.addEventListener('DOMContentLoaded', function () {
  var toc = document.getElementById('markdown-toc');
  var drawer = document.getElementById('toc-drawer');
  var tocHeader = document.getElementById('toc-header');

  if (!toc || !drawer || !tocHeader) return;

  // Find headings inside the main article content
  var article = document.querySelector('article');
  if (!article) return;

  var headings = article.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    toc.style.display = 'none';
    return;
  }

  // Build TOC list from headings
  var ul = document.createElement('ul');
  headings.forEach(function (heading, i) {
    if (!heading.id) {
      heading.id = 'toc-heading-' + i;
    }

    var li = document.createElement('li');
    if (heading.tagName === 'H3') {
      li.classList.add('toc-h3');
    }

    var a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;

    li.appendChild(a);
    ul.appendChild(li);
  });

  drawer.appendChild(ul);

  // Toggle drawer visibility when header is clicked
  tocHeader.addEventListener('click', function () {
    drawer.classList.toggle('js-hidden');
  });
});
