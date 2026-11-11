// Barras laterales de la sección de apuntes:
//  - izquierda: temas de la asignatura y sus materiales (sale de js/apuntes-mapa.js)
//  - derecha: «En esta página», con los apartados (h2) del apunte que se está leyendo
// En pantallas estrechas las dos se convierten en desplegables encima del texto.
(function () {
  var mapa = window.MAPA_APUNTES || [];
  var main = document.querySelector('main');
  if (!main) return;
  var partes = location.pathname.split('/').filter(Boolean); // ['apuntes', asignatura, tema, material]
  if (partes[0] !== 'apuntes') return;
  var asig = mapa.filter(function (a) { return a.slug === partes[1]; })[0];
  if (!asig) return;
  var temaActual = partes[2] || '', matActual = partes[3] || '';
  var base = '/apuntes/' + asig.slug + '/';

  function el(tag, attrs, texto) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (texto) e.textContent = texto;
    return e;
  }
  function enlace(href, texto, actual) {
    var a = el('a', { href: href }, texto);
    if (actual) a.setAttribute('aria-current', 'page');
    return a;
  }
  function plegable(clase, titulo, contenido) {
    var d = el('details', { 'class': 'plegable ' + clase });
    d.appendChild(el('summary', {}, titulo));
    d.appendChild(contenido);
    return d;
  }

  // Barra izquierda
  var izq = el('nav', { 'class': 'nav-temas', 'aria-label': 'Temas de la asignatura' });
  izq.appendChild(enlace(base, asig.titulo, !temaActual)).className = 'nav-asig';
  if (!asig.temas.length) izq.appendChild(el('p', { 'class': 'vacio' }, 'Próximamente.'));
  var lista = el('ul', {});
  asig.temas.forEach(function (t) {
    var li = el('li', {});
    var abierto = t.slug === temaActual;
    var a = enlace(base + t.slug + '/', '', abierto && !matActual);
    a.appendChild(el('span', { 'class': 'nav-num' }, 'Tema ' + t.num));
    a.appendChild(document.createTextNode(t.titulo));
    if (abierto) a.classList.add('abierto');
    li.appendChild(a);
    if (abierto && t.materiales.length) {
      var sub = el('ul', {});
      t.materiales.forEach(function (m) {
        var sli = el('li', {});
        var sa = enlace(base + t.slug + '/' + m.slug + '/', '', m.slug === matActual);
        sa.appendChild(el('span', { 'class': 'nav-tipo' }, m.tipo));
        sa.appendChild(document.createTextNode(m.titulo));
        sli.appendChild(sa);
        sub.appendChild(sli);
      });
      li.appendChild(sub);
    }
    lista.appendChild(li);
  });
  izq.appendChild(lista);

  // Barra derecha: apartados de la página
  var h2s = [].slice.call(main.querySelectorAll('h2'));
  var der = null, derMovil = null, enlacesDer = [];
  if (h2s.length >= 3) {
    function listaApartados() {
      var ul = el('ul', {});
      h2s.forEach(function (h, i) {
        if (!h.id) h.id = 'apartado-' + (i + 1);
        var a = el('a', { href: '#' + h.id }, h.textContent);
        enlacesDer.push(a);
        var li = el('li', {}); li.appendChild(a); ul.appendChild(li);
      });
      return ul;
    }
    der = el('nav', { 'class': 'barra-der', 'aria-label': 'En esta página' });
    der.appendChild(el('p', { 'class': 'barra-titulo' }, 'En esta página'));
    der.appendChild(listaApartados());
    derMovil = plegable('solo-estrecho-der', 'En esta página', listaApartados());
    document.body.classList.add('con-apartados');
  }

  // Montaje: [barra izquierda] [contenido] [barra derecha]
  document.body.classList.add('con-barras');
  var caja = el('div', { 'class': 'disposicion' + (der ? ' con-der' : '') });
  main.parentNode.insertBefore(caja, main);
  var asideIzq = el('aside', { 'class': 'barra-izq' });
  var tituloIzq = el('p', { 'class': 'barra-titulo' }, asig.curso);
  asideIzq.appendChild(tituloIzq);
  asideIzq.appendChild(izq);
  caja.appendChild(asideIzq);
  caja.appendChild(main);
  if (der) caja.appendChild(el('aside', { 'class': 'barra-der-caja' })).appendChild(der);

  // Versión estrecha: desplegables encima del texto (después del título)
  var h1 = main.querySelector('h1');
  var ancla = h1 ? h1.nextSibling : main.firstChild;
  var movil = el('div', { 'class': 'nav-estrecha' });
  movil.appendChild(plegable('solo-estrecho-izq', 'Temas de la asignatura', izq.cloneNode(true)));
  if (derMovil) movil.appendChild(derMovil);
  main.insertBefore(movil, ancla);
  [].forEach.call(movil.querySelectorAll('a'), function (a) {
    a.addEventListener('click', function () { var d = a.closest('details'); if (d) d.open = false; });
  });

  // Marcar el apartado que se está leyendo
  if (der) {
    var pendiente = false;
    function marcar() {
      pendiente = false;
      var actual = h2s[0].id;
      for (var i = 0; i < h2s.length; i++) {
        if (h2s[i].getBoundingClientRect().top < window.innerHeight * 0.3) actual = h2s[i].id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) actual = h2s[h2s.length - 1].id;
      enlacesDer.forEach(function (a) { a.classList.toggle('activo', a.getAttribute('href') === '#' + actual); });
    }
    window.addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(marcar); } }, { passive: true });
    marcar();
  }
})();
