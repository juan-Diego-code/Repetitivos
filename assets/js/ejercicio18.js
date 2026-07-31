function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-calcular').addEventListener('click', () => {
  const capital = parseFloat(document.getElementById('capital').value);
  const tasa = parseFloat(document.getElementById('tasa').value) / 100;
  const anioInicial = parseInt(document.getElementById('anio-inicial').value);
  if (isNaN(capital) || isNaN(tasa) || isNaN(anioInicial)) return;

  const anioActual = new Date().getFullYear();
  const n = anioActual - anioInicial;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';

  let valor = capital;
  const filaInicial = document.createElement('tr');
  filaInicial.innerHTML = `<td>${anioInicial} (inicio)</td><td class="num">${formatoMoneda(valor)}</td>`;
  cuerpo.appendChild(filaInicial);

  // ---- Ciclo Para: aplica el interés compuesto año por año ----
  for (let anio = 1; anio <= n; anio++) {
    valor = valor * (1 + tasa);
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${anioInicial + anio}</td><td class="num">${formatoMoneda(valor)}</td>`;
    cuerpo.appendChild(fila);
  }

  document.getElementById('etiqueta-final').textContent = `Valor de la inversión en ${anioInicial + n} (${n} años después)`;
  document.getElementById('valor-final').textContent = formatoMoneda(valor);

  document.getElementById('panel-tabla').classList.remove('oculto');
  document.getElementById('panel-resumen').classList.remove('oculto');
});
