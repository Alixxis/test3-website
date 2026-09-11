(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal sections as they enter the viewport */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Projects page: filter entries by method */
  var filters = document.querySelector('.filters');
  if (filters) {
    var entries = Array.prototype.slice.call(document.querySelectorAll('.entry'));
    var count = document.getElementById('resultCount');
    filters.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button');
      if (!btn) return;
      var want = btn.getAttribute('data-filter');
      filters.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      var shown = 0;
      entries.forEach(function (en) {
        var tags = (en.getAttribute('data-methods') || '').split(' ');
        var show = want === 'all' || tags.indexOf(want) > -1;
        en.hidden = !show;
        if (show) shown++;
      });
      if (count) {
        count.textContent = shown === entries.length
          ? 'Showing all ' + entries.length + ' projects'
          : 'Showing ' + shown + ' of ' + entries.length + ' projects';
      }
    });
  }
})();
