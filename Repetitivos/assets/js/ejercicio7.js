const PRECIOS = { S: 20000, D: 25000, T: 28000 };
const NOMBRES = { S: 'Sencilla', D: 'Doble', T: 'Triple' };

let N = 0, i = 0, compra = [];
let tabActiva = 'mientras';

const notas = {
  mientras: 'Mientras (while): antes de leer cada hamburguesa se verifica si i < N; si N es 0, el ciclo no se ejecuta ninguna vez.',
  para: 'Para (for): el contador, la condición y el incremento quedan definidos desde el inicio del ciclo (i = 1 hasta N).'
};

const panelInicio = document.getElementById('panel-inicio');
const panelRegistro = document.getElementById('panel-registro');
const panelResultado = document.getElementById('panel-resultado');

document.getElementById('btn-tab-mientras').addEventListener('click', () => cambiarTab('mientras'));
document.getElementById('btn-tab-para').addEventListener('click', () => cambiarTab('para'));
function cambiarTab(tab) {
  tabActiva = tab;
  document.getElementById('nota-ciclo').textContent = notas[tab];
  document.getElementById('btn-tab-mientras').style.borderColor = tab === 'mientras' ? 'var(--secundario)' : 'var(--linea)';
  document.getElementById('btn-tab-para').style.borderColor = tab === 'para' ? 'var(--secundario)' : 'var(--linea)';
}
cambiarTab('mientras');

function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('cantidad').value);
  if (isNaN(valor) || valor <= 0) return;
  N = valor; i = 0; compra = [];
  panelInicio.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelRegistro.classList.remove('oculto');
  actualizarProgreso();
});

function actualizarProgreso() {
  document.getElementById('texto-progreso').textContent = `Hamburguesa ${i + 1} de ${N}`;
  document.getElementById('barra-relleno').style.width = `${(i / N) * 100}%`;
}

document.querySelectorAll('#panel-registro .opcion').forEach(boton => {
  boton.addEventListener('click', () => {
    compra.push(boton.dataset.tipo);
    i++;
    if (i >= N) mostrarResultado();
    else actualizarProgreso();
  });
});

function mostrarResultado() {
  panelRegistro.classList.add('oculto');
  panelResultado.classList.remove('oculto');
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  let subtotal = 0;
  compra.forEach((tipo, index) => {
    subtotal += PRECIOS[tipo];
    const ficha = document.createElement('div');
    ficha.className = 'ficha';
    ficha.innerHTML = `<div class="badge">${tipo}</div><div class="num">Hamburguesa #${index + 1} · ${NOMBRES[tipo]}</div><div class="cifra">${formatoMoneda(PRECIOS[tipo])}</div><div></div>`;
    lista.appendChild(ficha);
  });
  const cargo = subtotal * 0.05;
  document.getElementById('subtotal').textContent = formatoMoneda(subtotal);
  document.getElementById('cargo').textContent = formatoMoneda(cargo);
  document.getElementById('total').textContent = formatoMoneda(subtotal + cargo);
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('cantidad').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});