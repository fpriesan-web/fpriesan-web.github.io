// Cuestionario de autoevaluación: cada <li class="pregunta"> tiene botones .respuesta;
// las correctas llevan data-ok. Con varias correctas se marcan y se pulsa .corregir.
(function () {
  var lista = document.querySelector('.cuestionario');
  if (!lista) return;
  var preguntas = lista.querySelectorAll('.pregunta');
  var marcador = document.querySelector('[data-marcador]');
  var total = preguntas.length;

  function actualizar() {
    var hechas = lista.querySelectorAll('.pregunta.resuelta').length;
    var bien = lista.querySelectorAll('.pregunta.acierto').length;
    if (marcador) marcador.textContent = 'Aciertos: ' + bien + ' de ' + hechas + ' respondidas (' + total + ' preguntas)';
  }

  function resolver(p, mostrarSolo) {
    if (p.classList.contains('resuelta')) return;
    var acierto = true;
    p.querySelectorAll('.respuesta').forEach(function (b) {
      var ok = b.hasAttribute('data-ok');
      var elegida = b.classList.contains('elegida');
      if (ok) b.classList.add('correcta');
      if (elegida && !ok) b.classList.add('incorrecta');
      if (ok !== elegida) acierto = false;
      b.disabled = true;
    });
    var c = p.querySelector('.corregir');
    if (c) c.disabled = true;
    p.classList.add('resuelta');
    if (acierto && !mostrarSolo) p.classList.add('acierto');
    actualizar();
  }

  preguntas.forEach(function (p) {
    var varias = !!p.querySelector('.corregir');
    p.querySelectorAll('.respuesta').forEach(function (b) {
      b.addEventListener('click', function () {
        if (varias) { b.classList.toggle('elegida'); b.setAttribute('aria-pressed', b.classList.contains('elegida')); }
        else { b.classList.add('elegida'); resolver(p); }
      });
    });
    if (varias) p.querySelector('.corregir').addEventListener('click', function () { resolver(p); });
  });

  var ver = document.querySelector('[data-soluciones]');
  if (ver) ver.addEventListener('click', function () {
    preguntas.forEach(function (p) { resolver(p, true); });
  });
  var reiniciar = document.querySelector('[data-reiniciar]');
  if (reiniciar) reiniciar.addEventListener('click', function () {
    preguntas.forEach(function (p) {
      p.classList.remove('resuelta', 'acierto');
      p.querySelectorAll('button').forEach(function (b) {
        b.disabled = false; b.classList.remove('elegida', 'correcta', 'incorrecta'); b.removeAttribute('aria-pressed');
      });
    });
    actualizar();
    window.scrollTo(0, lista.offsetTop - 120);
  });
  actualizar();
})();
