// Modo claro / oscuro. Sin elección guardada, la web sigue el ajuste del dispositivo.
(function () {
  var raiz = document.documentElement;
  try { var guardado = localStorage.getItem('tema'); if (guardado) raiz.setAttribute('data-tema', guardado); } catch (e) {}
  function actual() {
    var t = raiz.getAttribute('data-tema');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
  }
  function pintar(boton) {
    var oscuro = actual() === 'oscuro';
    boton.textContent = oscuro ? '☀ Modo claro' : '☾ Modo oscuro';
    boton.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  document.addEventListener('DOMContentLoaded', function () {
    var boton = document.getElementById('cambiar-tema');
    if (!boton) return;
    boton.hidden = false;
    pintar(boton);
    boton.addEventListener('click', function () {
      var nuevo = actual() === 'oscuro' ? 'claro' : 'oscuro';
      raiz.setAttribute('data-tema', nuevo);
      try { localStorage.setItem('tema', nuevo); } catch (e) {}
      pintar(boton);
    });
  });
})();
