document.getElementById('btn-calcular').addEventListener('click', () => {
  const k = parseFloat(document.getElementById('k').value);
  const hasta = parseInt(document.getElementById('hasta').value);
  if (isNaN(k) || isNaN(hasta) || hasta <= 0) return;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';

  // ---- Ciclo Para: i = 1 hasta "hasta" ----
  for (let i = 1; i <= hasta; i++) {
    const resultado = k * i;
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${k} × ${i}</td><td class="num">${resultado.toLocaleString('es-CO')}</td>`;
    cuerpo.appendChild(fila);
  }

  document.getElementById('panel-tabla').classList.remove('oculto');
});
