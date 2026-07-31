const TASAS = { 1: 0.10, 2: 0.07, 3: 0.05 };
let vehiculos = [];

function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-agregar').addEventListener('click', () => {
  const clave = parseInt(document.getElementById('clave').value);
  const costo = parseFloat(document.getElementById('costo').value);
  if (isNaN(costo) || costo <= 0) return;

  const impuesto = costo * TASAS[clave];
  vehiculos.push({ clave, costo, impuesto });

  document.getElementById('costo').value = '';
  document.getElementById('costo').focus();
  render();
});

function quitarVehiculo(index) {
  vehiculos.splice(index, 1);
  render();
}

function render() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  if (vehiculos.length === 0) {
    lista.innerHTML = '<p class="vacio">Aún no se ha registrado ningún vehículo.</p>';
  } else {
    vehiculos.forEach((v, index) => {
      const ficha = document.createElement('div');
      ficha.className = 'ficha';
      ficha.innerHTML = `
        <div class="badge">${v.clave}</div>
        <div class="num">Vehículo #${index + 1} · costo ${formatoMoneda(v.costo)}</div>
        <div class="cifra">${formatoMoneda(v.impuesto)}</div>
        <button type="button" class="quitar" data-index="${index}">Quitar</button>
      `;
      lista.appendChild(ficha);
    });
    lista.querySelectorAll('.quitar').forEach(btn => {
      btn.addEventListener('click', () => quitarVehiculo(parseInt(btn.dataset.index)));
    });
  }

  // ---- Ciclo Repetir: recorre la lista acumulando por categoría ----
  let total1 = 0, total2 = 0, total3 = 0, totalGeneral = 0;
  let idx = 0;
  if (vehiculos.length > 0) {
    do {
      const v = vehiculos[idx];
      if (v.clave === 1) total1 += v.impuesto;
      else if (v.clave === 2) total2 += v.impuesto;
      else if (v.clave === 3) total3 += v.impuesto;
      totalGeneral += v.impuesto;
      idx++;
    } while (idx < vehiculos.length);
  }

  document.getElementById('total-1').textContent = formatoMoneda(total1);
  document.getElementById('total-2').textContent = formatoMoneda(total2);
  document.getElementById('total-3').textContent = formatoMoneda(total3);
  document.getElementById('total-general').textContent = formatoMoneda(totalGeneral);
}

render();
