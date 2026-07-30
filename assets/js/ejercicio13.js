let N = 0, i = 0;
let conteo1 = 0, monto1 = 0, conteo2 = 0, monto2 = 0, conteo3 = 0, monto3 = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');
const inputMonto = document.getElementById('monto');

function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0;
  conteo1 = 0; monto1 = 0; conteo2 = 0; monto2 = 0; conteo3 = 0; monto3 = 0;

  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
  inputMonto.value = '';
  inputMonto.focus();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Venta ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.getElementById('btn-registrar').addEventListener('click', registrar);
inputMonto.addEventListener('keydown', (e) => { if (e.key === 'Enter') registrar(); });

function registrar() {
  const monto = parseFloat(inputMonto.value);
  if (isNaN(monto) || monto < 0) return;

  // ---- Ciclo Para: clasificación de cada venta ----
  if (monto <= 50000) { conteo1++; monto1 += monto; }
  else if (monto < 200000) { conteo2++; monto2 += monto; }
  else { conteo3++; monto3 += monto; }

  i++;

  if (i >= N) {
    mostrarResultado();
  } else {
    actualizarProgreso();
    inputMonto.value = '';
    inputMonto.focus();
  }
}

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');

  document.getElementById('conteo-r1').textContent = `${conteo1} · ${formatoMoneda(monto1)}`;
  document.getElementById('conteo-r2').textContent = `${conteo2} · ${formatoMoneda(monto2)}`;
  document.getElementById('conteo-r3').textContent = `${conteo3} · ${formatoMoneda(monto3)}`;
  document.getElementById('monto-global').textContent = formatoMoneda(monto1 + monto2 + monto3);
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});