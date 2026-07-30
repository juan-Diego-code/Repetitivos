let N = 0, i = 0, contadorVerde = 0, contadorBlanco = 0, contadorRojo = 0;

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;

  N = valor; i = 0; contadorVerde = 0; contadorBlanco = 0; contadorRojo = 0;
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
});

document.querySelectorAll('.opcion').forEach(boton => {
  boton.addEventListener('click', () => {
    const color = boton.dataset.color;

    // ---- Ciclo Para: i = 1 hasta N ----
    if (color === 'verde') contadorVerde++;
    else if (color === 'blanco') contadorBlanco++;
    else if (color === 'rojo') contadorRojo++;

    i++;

    if (i >= N) mostrarResultado();
    else actualizarProgreso();
  });
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Foco ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');
  document.getElementById('conteo-verde').textContent = contadorVerde;
  document.getElementById('conteo-blanco').textContent = contadorBlanco;
  document.getElementById('conteo-rojo').textContent = contadorRojo;
  document.getElementById('conteo-total').textContent = contadorVerde + contadorBlanco + contadorRojo;
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});