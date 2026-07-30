let N = 0, i = 0, totalNeto = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');

function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0; totalNeto = 0;
  document.getElementById('cuerpo-tabla').innerHTML = '';
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Trabajador ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.getElementById('btn-registrar').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim() || `Trabajador ${i + 1}`;
  const horas = parseFloat(document.getElementById('horas').value);
  const valorHora = parseFloat(document.getElementById('valor-hora').value);
  if (isNaN(horas) || isNaN(valorHora) || horas < 0 || valorHora < 0) return;

  const bruto = horas * valorHora;

  // ---- Ciclo Para: descuento según el tramo del sueldo ----
  let porcentaje;
  if (bruto <= 150000) porcentaje = 0.05;
  else if (bruto <= 300000) porcentaje = 0.07;
  else porcentaje = 0.09;

  const descuento = bruto * porcentaje;
  const neto = bruto - descuento;
  totalNeto += neto;
  i++;

  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${nombre}</td><td class="num">${formatoMoneda(bruto)}</td><td class="num">${(porcentaje * 100).toFixed(0)}% (${formatoMoneda(descuento)})</td><td class="num">${formatoMoneda(neto)}</td>`;
  document.getElementById('cuerpo-tabla').appendChild(fila);

  document.getElementById('nombre').value = '';
  document.getElementById('horas').value = '';
  document.getElementById('valor-hora').value = '';

  if (i >= N) {
    mostrarResultado();
  } else {
    actualizarProgreso();
    document.getElementById('nombre').focus();
  }
});

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');
  document.getElementById('total').textContent = formatoMoneda(totalNeto);
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});