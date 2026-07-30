let N = 0, i = 0, total = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');
const inputPrecio = document.getElementById('precio');

function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0; total = 0;
  document.getElementById('cuerpo-tabla').innerHTML = '';
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
  inputPrecio.value = '';
  inputPrecio.focus();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Artículo ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.getElementById('btn-registrar').addEventListener('click', registrar);
inputPrecio.addEventListener('keydown', (e) => { if (e.key === 'Enter') registrar(); });

function registrar() {
  const precio = parseFloat(inputPrecio.value);
  if (isNaN(precio) || precio < 0) return;

  // ---- Ciclo Para: por cada artículo se determina su descuento ----
  let porcentaje;
  if (precio >= 20000) porcentaje = 0.15;
  else if (precio > 10000 && precio < 20000) porcentaje = 0.12;
  else porcentaje = 0.10;

  const descuento = precio * porcentaje;
  const pagado = precio - descuento;
  total += pagado;
  i++;

  const fila = document.createElement('tr');
  fila.innerHTML = `<td>#${i}</td><td class="num">${formatoMoneda(precio)}</td><td class="num">${(porcentaje * 100).toFixed(0)}% (${formatoMoneda(descuento)})</td><td class="num">${formatoMoneda(pagado)}</td>`;
  document.getElementById('cuerpo-tabla').appendChild(fila);

  if (i >= N) {
    mostrarResultado();
  } else {
    actualizarProgreso();
    inputPrecio.value = '';
    inputPrecio.focus();
  }
}

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');
  document.getElementById('total').textContent = formatoMoneda(total);
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});