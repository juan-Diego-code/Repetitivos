let N = 0, i = 0, interesTotal = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');

function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0; interesTotal = 0;
  document.getElementById('cuerpo-tabla').innerHTML = '';
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Cliente ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.getElementById('btn-registrar').addEventListener('click', () => {
  const saldoAnterior = parseFloat(document.getElementById('saldo-anterior').value);
  const compras = parseFloat(document.getElementById('compras').value);
  const pago = parseFloat(document.getElementById('pago').value);
  if (isNaN(saldoAnterior) || isNaN(compras) || isNaN(pago)) return;

  // ---- Ciclo Repetir: se procesa un cliente en cada vuelta ----
  const saldoBase = saldoAnterior + compras - pago;
  const pagoMinimoRequerido = saldoAnterior * 0.15;
  const esMoroso = pago < pagoMinimoRequerido;

  let interes = 0, multa = 0, saldoActual = saldoBase;
  if (esMoroso) {
    interes = saldoBase * 0.12;
    multa = 200000;
    saldoActual = saldoBase + interes + multa;
    interesTotal += interes;
  }

  const pagoMinimo = saldoActual * 0.15;
  const pagoSinInteres = saldoActual * 0.85;
  i++;

  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>#${i}</td>
    <td>${esMoroso ? 'Moroso' : 'Al día'}</td>
    <td class="num">${formatoMoneda(saldoActual)}</td>
    <td class="num">${formatoMoneda(pagoMinimo)}</td>
    <td class="num">${formatoMoneda(pagoSinInteres)}</td>
  `;
  document.getElementById('cuerpo-tabla').appendChild(fila);

  document.getElementById('saldo-anterior').value = '';
  document.getElementById('compras').value = '';
  document.getElementById('pago').value = '';

  if (i >= N) {
    mostrarResultado();
  } else {
    actualizarProgreso();
    document.getElementById('saldo-anterior').focus();
  }
});

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');
  document.getElementById('interes-total').textContent = formatoMoneda(interesTotal);
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});
