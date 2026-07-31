document.getElementById('btn-calcular').addEventListener('click', () => {
  const x = parseFloat(document.getElementById('x').value);
  const terminos = parseInt(document.getElementById('terminos').value);
  if (isNaN(x) || isNaN(terminos) || terminos <= 0) return;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';

  let suma = 0;

  // ---- Ciclo Para: término k = 0 hasta N-1 ----
  for (let k = 0; k < terminos; k++) {
    const exponente = 2 * k + 1;
    const signo = (k % 2 === 0) ? 1 : -1;

    let factorial = 1;
    for (let f = 2; f <= exponente; f++) factorial *= f;

    const termino = signo * Math.pow(x, exponente) / factorial;
    suma += termino;

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${signo > 0 ? '+' : '−'} X^${exponente} / ${exponente}!</td><td class="num">${termino.toFixed(6)}</td><td class="num">${suma.toFixed(6)}</td>`;
    cuerpo.appendChild(fila);
  }

  const real = Math.sin(x);

  document.getElementById('resultado-serie').textContent = suma.toFixed(6);
  document.getElementById('resultado-real').textContent = real.toFixed(6);
  document.getElementById('diferencia').textContent = Math.abs(real - suma).toExponential(4);

  document.getElementById('panel-tabla').classList.remove('oculto');
  document.getElementById('panel-resumen').classList.remove('oculto');
});
