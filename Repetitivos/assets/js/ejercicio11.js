document.getElementById('btn-calcular').addEventListener('click', () => {
  const x = parseFloat(document.getElementById('x').value);
  const terminos = parseInt(document.getElementById('terminos').value);
  if (isNaN(x) || isNaN(terminos) || terminos <= 0) return;

  const cuerpo = document.getElementById('cuerpo-tabla');
  cuerpo.innerHTML = '';

  let suma = 0;
  let factorial = 1;
  let potencia = 1;

  // ---- Ciclo Para: término n = 0 hasta N-1 ----
  for (let n = 0; n < terminos; n++) {
    if (n > 0) {
      factorial *= n;
      potencia *= x;
    }
    const termino = potencia / factorial;
    suma += termino;

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>x^${n} / ${n}!</td><td class="num">${termino.toFixed(6)}</td><td class="num">${suma.toFixed(6)}</td>`;
    cuerpo.appendChild(fila);
  }

  const real = Math.exp(x);

  document.getElementById('resultado-serie').textContent = suma.toFixed(6);
  document.getElementById('resultado-real').textContent = real.toFixed(6);
  document.getElementById('diferencia').textContent = Math.abs(real - suma).toExponential(4);

  document.getElementById('panel-tabla').classList.remove('oculto');
  document.getElementById('panel-resumen').classList.remove('oculto');
});