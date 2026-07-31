let N = 0, i = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');
const inputNumero = document.getElementById('numero');

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0;
  document.getElementById('cuerpo-tabla').innerHTML = '';
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
  inputNumero.value = '';
  inputNumero.focus();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Número ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.getElementById('btn-registrar').addEventListener('click', registrar);
inputNumero.addEventListener('keydown', (e) => { if (e.key === 'Enter') registrar(); });

function registrar() {
  const numero = parseFloat(inputNumero.value);
  if (isNaN(numero) || numero <= 0) return;

  // ---- Ciclo Mientras: se repite mientras i < N ----
  const cubo = Math.pow(numero, 3);

  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${numero}</td><td class="num">${cubo.toLocaleString('es-CO')}</td>`;
  document.getElementById('cuerpo-tabla').appendChild(fila);

  i++;

  if (i >= N) {
    panelRegistro.classList.add('oculto');
    panelResultado.classList.remove('oculto');
  } else {
    actualizarProgreso();
    inputNumero.value = '';
    inputNumero.focus();
  }
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});
