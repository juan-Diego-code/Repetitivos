function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-calcular').addEventListener('click', () => {
  const deposito = parseFloat(document.getElementById('deposito').value);
  const anios = parseInt(document.getElementById('anios').value);
  if (isNaN(deposito) || isNaN(anios) || anios <= 0) return;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';

  const TASA = 0.10;
  let saldo = 0;

  // ---- Ciclo Para: año = 1 hasta N ----
  for (let anio = 1; anio <= anios; anio++) {
    const aporteAnual = deposito * 12;
    saldo += aporteAnual;
    const interes = saldo * TASA;
    saldo += interes;

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${anio}</td><td class="num">${formatoMoneda(aporteAnual)}</td><td class="num">${formatoMoneda(interes)}</td><td class="num">${formatoMoneda(saldo)}</td>`;
    cuerpo.appendChild(fila);
  }

  document.getElementById('saldo-final').textContent = formatoMoneda(saldo);
  document.getElementById('panel-tabla').classList.remove('oculto');
  document.getElementById('panel-resumen').classList.remove('oculto');
});