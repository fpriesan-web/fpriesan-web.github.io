// Pinta los accesos de Cine y Educación a partir de window.PELICULAS.
(function () {
  var pelis = (window.PELICULAS || []).slice();
  if (!pelis.length) return;
  var base = '/recursos/cine-y-educacion/';
  var url = function (p) { return base + p.slug + '/'; };
  // Para ordenar se ignoran los artículos iniciales ("El", "La", "Los"…).
  var clave = function (p) { return p.titulo.replace(/^(el|la|los|las|un|una|unos|unas)\s+/i, ''); };
  var alfa = pelis.slice().sort(function (a, b) { return clave(a).localeCompare(clave(b), 'es', { sensitivity: 'base' }); });
  var ultima = pelis.slice().sort(function (a, b) { return (b.anadida || '').localeCompare(a.anadida || ''); })[0];
  var esc = function (t) { var d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; };
  var datos = function (p) { return [p.anio, p.direccion].filter(Boolean).map(esc).join(' · '); };
  var tarjeta = function (p) {
    return '<a class="tarjeta" href="' + url(p) + '"><span class="etiqueta">' + datos(p) + '</span><h3>' + esc(p.titulo) + '</h3>' + (p.resumen ? '<p>' + esc(p.resumen) + '</p>' : '') + '</a>';
  };

  document.querySelectorAll('[data-cine="enlace-ultima"]').forEach(function (a) { a.href = url(ultima); });

  var u = document.querySelector('[data-cine="ultima"]');
  if (u) u.innerHTML = '<div class="destacada">' + tarjeta(ultima) + '</div>';

  var sel = document.querySelector('[data-cine="desplegable"]');
  if (sel) {
    sel.disabled = false;
    sel.innerHTML = '<option value="">Elige una película…</option>' + alfa.map(function (p) {
      return '<option value="' + url(p) + '">' + esc(p.titulo) + (p.anio ? ' (' + esc(p.anio) + ')' : '') + '</option>';
    }).join('');
    sel.addEventListener('change', function () { if (sel.value) location.href = sel.value; });
  }

  var az = document.querySelector('[data-cine="az"]');
  if (az) {
    var grupos = {};
    alfa.forEach(function (p) {
      var l = clave(p).charAt(0).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
      if (!/[A-ZÑ]/.test(l)) l = '#';
      (grupos[l] = grupos[l] || []).push(p);
    });
    var letras = Object.keys(grupos);
    az.innerHTML = '<nav class="letras" aria-label="Letras">' + letras.map(function (l) { return '<a href="#letra-' + l + '">' + l + '</a>'; }).join('') + '</nav>' +
      letras.map(function (l) { return '<h2 id="letra-' + l + '">' + l + '</h2><div class="lista">' + grupos[l].map(tarjeta).join('') + '</div>'; }).join('');
  }
})();
