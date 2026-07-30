let N = 0, i = 0, ceros = 0, negativas = 0, positivas = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');
const inputValor = document.getElementById('valor');

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0; ceros = 0; negativas = 0; positivas = 0;
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
  inputValor.value = '';
  inputValor.focus();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Valor ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.getElementById('btn-registrar').addEventListener('click', registrar);
inputValor.addEventListener('keydown', (e) => { if (e.key === 'Enter') registrar(); });

function registrar() {
  const n = parseFloat(inputValor.value);
  if (isNaN(n)) return;

  // ---- Clasificación dentro del ciclo Mientras ----
  if (n === 0) ceros++;
  else if (n < 0) negativas++;
  else positivas++;

  i++;

  if (i >= N) {
    mostrarResultado();
  } else {
    actualizarProgreso();
    inputValor.value = '';
    inputValor.focus();
  }
}

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');

  document.getElementById('conteo-cero').textContent = ceros;
  document.getElementById('conteo-negativas').textContent = negativas;
  document.getElementById('conteo-positivas').textContent = positivas;
  document.getElementById('conteo-total').textContent = ceros + negativas + positivas;
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});