let denominaciones = [];

function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-agregar').addEventListener('click', () => {
  const valor = parseFloat(document.getElementById('valor-denominacion').value);
  const cantidad = parseInt(document.getElementById('cantidad-denominacion').value);
  if (isNaN(valor) || valor <= 0 || isNaN(cantidad) || cantidad < 0) return;

  denominaciones.push({ valor, cantidad });

  document.getElementById('valor-denominacion').value = '';
  document.getElementById('cantidad-denominacion').value = '';
  document.getElementById('valor-denominacion').focus();

  render();
});

function quitar(index) {
  denominaciones.splice(index, 1);
  render();
}

function render() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  if (denominaciones.length === 0) {
    lista.innerHTML = '<p class="vacio">Aún no se ha agregado ninguna denominación.</p>';
  } else {
    denominaciones.forEach((d, index) => {
      const ficha = document.createElement('div');
      ficha.className = 'ficha';
      ficha.innerHTML = `
        <div class="badge">${d.cantidad}x</div>
        <div class="num">Denominación de ${formatoMoneda(d.valor)}</div>
        <div class="cifra">${formatoMoneda(d.valor * d.cantidad)}</div>
        <button type="button" class="quitar" data-index="${index}">Quitar</button>
      `;
      lista.appendChild(ficha);
    });
    lista.querySelectorAll('.quitar').forEach(btn => {
      btn.addEventListener('click', () => quitar(parseInt(btn.dataset.index)));
    });
  }

  // ---- Ciclo Repetir: se suma cada denominación hasta agotar la lista ----
  let total = 0;
  let idx = 0;
  if (denominaciones.length > 0) {
    do {
      total += denominaciones[idx].valor * denominaciones[idx].cantidad;
      idx++;
    } while (idx < denominaciones.length);
  }

  document.getElementById('total').textContent = formatoMoneda(total);
}

render();