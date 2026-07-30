let N = 0, i = 0, aprobados = 0, reprobados = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');
const inputNota = document.getElementById('nota');

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0; aprobados = 0; reprobados = 0;
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
  inputNota.value = '';
  inputNota.focus();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Alumno ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.getElementById('btn-registrar').addEventListener('click', registrar);
inputNota.addEventListener('keydown', (e) => { if (e.key === 'Enter') registrar(); });

function registrar() {
  const nota = parseFloat(inputNota.value);
  if (isNaN(nota)) return;

  // ---- Ciclo Para: clasificación de cada alumno ----
  if (nota >= 3.0) aprobados++;
  else reprobados++;

  i++;

  if (i >= N) {
    mostrarResultado();
  } else {
    actualizarProgreso();
    inputNota.value = '';
    inputNota.focus();
  }
}

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');
  document.getElementById('conteo-aprobados').textContent = aprobados;
  document.getElementById('conteo-reprobados').textContent = reprobados;
  document.getElementById('conteo-total').textContent = aprobados + reprobados;
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});