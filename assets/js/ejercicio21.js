function formatoMoneda(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }

document.getElementById('btn-calcular').addEventListener('click', () => {
  const denominaciones = [
    { valor: 100,   id: 'd100' },
    { valor: 200,   id: 'd200' },
    { valor: 500,   id: 'd500' },
    { valor: 2000,  id: 'd2000' },
    { valor: 5000,  id: 'd5000' },
    { valor: 10000, id: 'd10000' },
  ];

  let total = 0;

  // ---- Ciclo Para: recorre cada denominación y suma su aporte ----
  for (let i = 0; i < denominaciones.length; i++) {
    const cantidad = parseInt(document.getElementById(denominaciones[i].id).value) || 0;
    total += denominaciones[i].valor * cantidad;
  }

  document.getElementById('total').textContent = formatoMoneda(total);
  document.getElementById('panel-resumen').classList.remove('oculto');
});
