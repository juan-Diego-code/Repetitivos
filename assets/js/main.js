  // Tasas de impuesto por clave
    const TASAS = { 1: 0.10, 2: 0.07, 3: 0.05 };

  // Arreglo que guarda cada vehículo registrado
    let vehiculos = [];

    const form = document.getElementById('form-vehiculo');
    const lista = document.getElementById('lista');
    const mensajeVacio = document.getElementById('mensaje-vacio');

    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const clave = parseInt(document.getElementById('clave').value);
    const costo = parseFloat(document.getElementById('costo').value);

    if (isNaN(costo) || costo <= 0) return;

    const impuesto = costo * TASAS[clave];

    vehiculos.push({ clave, costo, impuesto });

    document.getElementById('costo').value = '';
    document.getElementById('costo').focus();

    render();
    });

    function quitarVehiculo(index) {
    vehiculos.splice(index, 1);
    render();
    }

    function formatoMoneda(n) {
    return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function render() {
        // Renderiza la lista de fichas
        lista.innerHTML = '';

    if (vehiculos.length === 0) {
        lista.appendChild(mensajeVacio);
    } else {
        vehiculos.forEach((v, index) => {
        const ficha = document.createElement('div');
        ficha.className = 'ficha';
        ficha.innerHTML = `
            <div class="clave-badge">${v.clave}</div>
            <div class="num">Vehículo #${index + 1} · costo ${formatoMoneda(v.costo)}</div>
            <div class="costo">${(TASAS[v.clave] * 100)}%</div>
            <div class="impuesto">${formatoMoneda(v.impuesto)}</div>
            <button type="button" class="quitar" data-index="${index}">Quitar</button>
        `;
        lista.appendChild(ficha);
        });

        lista.querySelectorAll('.quitar').forEach(btn => {
        btn.addEventListener('click', () => quitarVehiculo(parseInt(btn.dataset.index)));
        });
    }

    // Acumuladores por categoría (misma lógica del ejercicio en JS puro)
    let totalCategoria1 = 0;
    let totalCategoria2 = 0;
    let totalCategoria3 = 0;
    let totalGeneral = 0;

    vehiculos.forEach(v => {
        if (v.clave === 1) totalCategoria1 += v.impuesto;
        else if (v.clave === 2) totalCategoria2 += v.impuesto;
        else if (v.clave === 3) totalCategoria3 += v.impuesto;
        totalGeneral += v.impuesto;
    });

    document.getElementById('total-1').textContent = formatoMoneda(totalCategoria1);
    document.getElementById('total-2').textContent = formatoMoneda(totalCategoria2);
    document.getElementById('total-3').textContent = formatoMoneda(totalCategoria3);
    document.getElementById('total-general').textContent = formatoMoneda(totalGeneral);
    }

    render();