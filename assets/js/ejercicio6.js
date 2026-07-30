function formatoMoneda(n) {
  return '$' + Math.round(n).toLocaleString('es-CO');
}

let tabActiva = 'repetir';
const notas = {
  repetir: 'Repetir (do...while): se ejecuta el bloque y al final se evalúa si se debe repetir — garantiza al menos una ejecución.',
  para: 'Para (for): se define de una vez el contador, su condición y su incremento — ideal cuando ya se sabe cuántas veces se repetirá.'
};

document.getElementById('btn-tab-repetir').addEventListener('click', () => cambiarTab('repetir'));
document.getElementById('btn-tab-para').addEventListener('click', () => cambiarTab('para'));

function cambiarTab(tab) {
  tabActiva = tab;
  document.getElementById('nota-ciclo').textContent = notas[tab];
  document.getElementById('btn-tab-repetir').style.borderColor = tab === 'repetir' ? 'var(--secundario)' : 'var(--linea)';
  document.getElementById('btn-tab-para').style.borderColor = tab === 'para' ? 'var(--secundario)' : 'var(--linea)';
}
cambiarTab('repetir');

document.getElementById('btn-calcular').addEventListener('click', () => {
  const salarioInicial = parseFloat(document.getElementById('salario').value);
  const tasa = parseFloat(document.getElementById('tasa').value) / 100;
  const anios = parseInt(document.getElementById('anios').value);
  if (isNaN(salarioInicial) || isNaN(tasa) || isNaN(anios) || anios <= 0) return;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';
  let sueldoActual = salarioInicial;

  if (tabActiva === 'repetir') {
    // ---- a) Ciclo Repetir ----
    let anio = 1;
    do {
      agregarFila(cuerpo, anio, sueldoActual);
      sueldoActual = sueldoActual * (1 + tasa);
      anio++;
    } while (anio <= anios);
  } else {
    // ---- b) Ciclo Para ----
    for (let anio = 1; anio <= anios; anio++) {
      agregarFila(cuerpo, anio, sueldoActual);
      sueldoActual = sueldoActual * (1 + tasa);
    }
  }

  document.getElementById('salario-final').textContent = formatoMoneda(sueldoActual);
  document.getElementById('panel-tabla').classList.remove('oculto');
  document.getElementById('panel-resumen').classList.remove('oculto');
});

function agregarFila(cuerpo, anio, sueldo) {
  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${anio}</td><td class="num">${formatoMoneda(sueldo)}</td>`;
  cuerpo.appendChild(fila);
}