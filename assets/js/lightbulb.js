// ---- Elementos ----
const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');

const inputCantidad = document.getElementById('cantidad');
const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');

const textoProgreso = document.getElementById('texto-progreso');
const barraRelleno = document.getElementById('barra-relleno');
const botonesColor = document.querySelectorAll('.opcion-color');

// ---- Estado del algoritmo ----
let N = 0;          // tamaño total del lote
let i = 0;           // contador del ciclo (foco actual)
let contadorVerde = 0;
let contadorBlanco = 0;
let contadorRojo = 0;

btnIniciar.addEventListener('click', () => {
  const valor = parseInt(inputCantidad.value);

  if (isNaN(valor) || valor <= 0) return;

  // Reinicia el algoritmo con el nuevo lote
  N = valor;
  i = 0;
  contadorVerde = 0;
  contadorBlanco = 0;
  contadorRojo = 0;

  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');

  actualizarProgreso();
});

// Ciclo principal: se ejecuta una vez por cada clic (una vuelta del "for i = 1 hasta N")
botonesColor.forEach(boton => {
  boton.addEventListener('click', () => {
    const color = boton.dataset.color;

    if (color === 'verde') contadorVerde++;
    else if (color === 'blanco') contadorBlanco++;
    else if (color === 'rojo') contadorRojo++;

    i++;

    if (i >= N) {
      mostrarResultado();
    } else {
      actualizarProgreso();
    }
  });
});

function actualizarProgreso() {
  textoProgreso.textContent = `Foco ${i + 1} de ${N}`;
  barraRelleno.style.width = `${(i / N) * 100}%`;
}

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');

  document.getElementById('conteo-verde').textContent = contadorVerde;
  document.getElementById('conteo-blanco').textContent = contadorBlanco;
  document.getElementById('conteo-rojo').textContent = contadorRojo;
  document.getElementById('conteo-total').textContent = contadorVerde + contadorBlanco + contadorRojo;
}

btnReiniciar.addEventListener('click', () => {
  inputCantidad.value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});