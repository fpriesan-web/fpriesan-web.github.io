// Actividad de arrastrar fichas a huecos. Cada ficha y cada hueco comparten data-id.
(function () {
  const banco = document.querySelector('.banco');
  const zonas = Array.from(document.querySelectorAll('.zona'));
  const resultado = document.querySelector('.resultado');
  const fichas = Array.from(banco.querySelectorAll('.ficha'));
  let elegida = null;

  function barajar() {
    fichas.sort(() => Math.random() - 0.5).forEach(f => banco.appendChild(f));
  }

  function limpiarMarcas() {
    zonas.forEach(z => z.classList.remove('bien', 'mal'));
    resultado.textContent = '';
  }

  function colocar(ficha, destino) {
    limpiarMarcas();
    if (destino.classList.contains('zona')) {
      const ocupante = destino.querySelector('.ficha');
      if (ocupante && ocupante !== ficha) {
        const origen = ficha.parentElement;
        // Intercambia si la ficha venía de otro hueco; si no, devuelve la ocupante al banco
        (origen.classList.contains('zona') ? origen : banco).appendChild(ocupante);
      }
    }
    destino.appendChild(ficha);
  }

  function elegir(ficha) {
    if (elegida) elegida.classList.remove('elegida');
    elegida = ficha === elegida ? null : ficha;
    if (elegida) elegida.classList.add('elegida');
  }

  function destinoEn(x, y) {
    const el = document.elementFromPoint(x, y);
    return el && (el.closest('.zona') || el.closest('.banco'));
  }

  let arrastre = null;
  document.addEventListener('pointerdown', e => {
    const ficha = e.target.closest('.ficha');
    if (!ficha || e.button > 0) return;
    e.preventDefault();
    const r = ficha.getBoundingClientRect();
    arrastre = { ficha, x0: e.clientX, y0: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width, movido: false, sobre: null };
  });

  document.addEventListener('pointermove', e => {
    if (!arrastre) return;
    const a = arrastre;
    if (!a.movido && Math.hypot(e.clientX - a.x0, e.clientY - a.y0) < 6) return;
    if (!a.movido) {
      a.movido = true;
      if (elegida) elegir(elegida);
      a.fantasma = a.ficha.cloneNode(true);
      a.fantasma.classList.add('arrastrando');
      a.fantasma.style.width = a.w + 'px';
      document.body.appendChild(a.fantasma);
      a.ficha.style.opacity = '0.3';
    }
    a.fantasma.style.left = (e.clientX - a.dx) + 'px';
    a.fantasma.style.top = (e.clientY - a.dy) + 'px';
    const d = destinoEn(e.clientX, e.clientY);
    if (d !== a.sobre) {
      if (a.sobre) a.sobre.classList.remove('activa');
      if (d) d.classList.add('activa');
      a.sobre = d;
    }
  });

  document.addEventListener('pointerup', e => {
    if (!arrastre) return;
    const a = arrastre;
    arrastre = null;
    if (a.movido) {
      a.fantasma.remove();
      a.ficha.style.opacity = '';
      if (a.sobre) { a.sobre.classList.remove('activa'); colocar(a.ficha, a.sobre); }
    } else {
      elegir(a.ficha);
    }
  });

  // Tocar un hueco o el banco con una ficha elegida la coloca allí
  document.addEventListener('click', e => {
    if (!elegida || e.target.closest('.ficha')) return;
    const d = e.target.closest('.zona') || e.target.closest('.banco');
    if (d) { colocar(elegida, d); elegir(elegida); }
  });

  document.getElementById('comprobar').addEventListener('click', () => {
    let bien = 0;
    zonas.forEach(z => {
      const f = z.querySelector('.ficha');
      z.classList.remove('bien', 'mal');
      if (!f) return;
      const ok = f.dataset.id === z.dataset.id;
      z.classList.add(ok ? 'bien' : 'mal');
      if (ok) bien++;
    });
    const vacios = zonas.filter(z => !z.querySelector('.ficha')).length;
    resultado.textContent = bien === zonas.length
      ? '¡Perfecto! Todos los componentes están en su sitio.'
      : `${bien} de ${zonas.length} correctos` + (vacios ? ` · ${vacios} huecos sin rellenar` : '');
  });

  document.getElementById('reiniciar').addEventListener('click', () => {
    limpiarMarcas();
    if (elegida) elegir(elegida);
    fichas.forEach(f => banco.appendChild(f));
    barajar();
  });

  barajar();
})();
