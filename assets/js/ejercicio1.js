function formatoMoneda(n) {
  return '$' + Math.round(n).toLocaleString('es-CO');
}

document.getElementById('btn-calcular').addEventListener('click', () => {
  const salarioInicial = parseFloat(document.getElementById('salario').value);
  const tasa = parseFloat(document.getElementById('tasa').value) / 100;
  const anios = parseInt(document.getElementById('anios').value);

  if (isNaN(salarioInicial) || isNaN(tasa) || isNaN(anios) || anios <= 0) return;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';

  // ---- Ciclo Mientras ----
  let sueldoActual = salarioInicial;
  let anio = 1;

  while (anio <= anios) {
    // salario recibido durante este año
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${anio}</td><td class="num">${formatoMoneda(sueldoActual)}</td>`;
    cuerpo.appendChild(fila);

    // se aplica el incremento para el siguiente año
    sueldoActual = sueldoActual * (1 + tasa);
    anio++;
  }

  document.getElementById('salario-final').textContent = formatoMoneda(sueldoActual);

  document.getElementById('panel-tabla').classList.remove('oculto');
  document.getElementById('panel-resumen').classList.remove('oculto');
});