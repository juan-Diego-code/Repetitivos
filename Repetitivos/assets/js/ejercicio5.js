document.getElementById('btn-calcular').addEventListener('click', () => {
  const dias = parseInt(document.getElementById('dias').value);
  if (isNaN(dias) || dias <= 0) return;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';

  let total = 0n; // BigInt, porque 3^365 no cabe en un número normal
  const maxFilasMostradas = 30;

  // ---- Ciclo Para: día = 1 hasta N ----
  for (let dia = 1; dia <= dias; dia++) {
    const ahorroDelDia = 3n ** BigInt(dia);
    total += ahorroDelDia;

    if (dia <= maxFilasMostradas) {
      const fila = document.createElement('tr');
      fila.innerHTML = `<td>${dia}</td><td class="num">$${ahorroDelDia.toLocaleString('es-CO')}</td>`;
      cuerpo.appendChild(fila);
    }
  }

  if (dias > maxFilasMostradas) {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td colspan="2" style="color:var(--texto-mute); text-align:center;">... ${dias - maxFilasMostradas} días más ...</td>`;
    cuerpo.appendChild(fila);
  }

  document.getElementById('total-anual').textContent = '$' + total.toLocaleString('es-CO');

  document.getElementById('panel-tabla').classList.remove('oculto');
  document.getElementById('panel-resumen').classList.remove('oculto');
});