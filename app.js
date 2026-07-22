(function () {
  var body = document.body;
  var langBtn = document.getElementById('langBtn');

  function applyLang(lang) {
    body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
    var t = body.getAttribute('data-title-' + lang);
    if (t) { document.title = t; }
    try { localStorage.setItem('newco-lang', lang); } catch (e) {}
  }

  var saved = 'fr';
  try { saved = localStorage.getItem('newco-lang') || 'fr'; } catch (e) {}
  applyLang(saved === 'en' ? 'en' : 'fr');

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(body.getAttribute('data-lang') === 'fr' ? 'en' : 'fr');
    });
  }

  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      menuBtn.classList.toggle('active');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('active');
      }
    });
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var lang = body.getAttribute('data-lang') || 'fr';
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name = g('cf-name'), org = g('cf-org'), email = g('cf-email'), topic = g('cf-topic'), msg = g('cf-msg');
      var subject = (lang === 'fr' ? 'Demande — ' : 'Inquiry — ') + (topic || 'Newco Studio');
      var lines = lang === 'fr'
        ? ['Nom : ' + name, 'Organisation : ' + org, 'Courriel : ' + email, 'Sujet : ' + topic, '', 'Message :', msg]
        : ['Name: ' + name, 'Organization: ' + org, 'Email: ' + email, 'Topic: ' + topic, '', 'Message:', msg];
      var href = 'mailto:info@newco-studio.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
})();
