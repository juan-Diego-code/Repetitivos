// Lista de todos los ejercicios del taller (usada por el nav y por index.html)
const EJERCICIOS = [
  { n: 1,  archivo: '/pages/ejercicio1.html',  titulo: 'Salario con incremento anual',        ciclo: 'Mientras' },
  { n: 2,  archivo: '/pages/ejercicio2.html',  titulo: 'Hamburguesas Guerreros',               ciclo: 'Repetir' },
  { n: 3,  archivo: '/pages/ejercicio3.html',  titulo: 'Cantidades cero / negativas / positivas', ciclo: 'Mientras' },
  { n: 4,  archivo: '/pages/ejercicio4.html',  titulo: 'Focos por color',                      ciclo: 'Para' },
  { n: 5,  archivo: '/pages/ejercicio5.html',  titulo: 'Ahorro diario (potencias de 3)',       ciclo: 'Para' },
  { n: 6,  archivo: '/pages/ejercicio6.html',  titulo: 'Salario anual (Repetir y Para)',       ciclo: 'Repetir / Para' },
  { n: 7,  archivo: '/pages/ejercicio7.html',  titulo: 'Hamburguesas (Mientras y Para)',       ciclo: 'Mientras / Para' },
  { n: 8,  archivo: '/pages/ejercicio8.html',  titulo: 'Descuento por articulo',               ciclo: 'Para' },
  { n: 9,  archivo: '/pages/ejercicio9.html',  titulo: 'Ahorros Bancolombia',                  ciclo: 'Para' },
  { n: 10, archivo: '/pages/ejercicio10.html', titulo: 'Edad promedio por salon',              ciclo: 'Para anidado' },
  { n: 11, archivo: '/pages/ejercicio11.html', titulo: 'Funcion exponencial e^x',              ciclo: 'Para' },
  { n: 12, archivo: '/pages/ejercicio12.html', titulo: 'Caja registradora',                    ciclo: 'Repetir' },
  { n: 13, archivo: '/pages/ejercicio13.html', titulo: 'Ventas por rango',                     ciclo: 'Para' },
  { n: 14, archivo: '/pages/ejercicio14.html', titulo: 'Aprobados y reprobados',               ciclo: 'Para' },
  { n: 15, archivo: '/pages/ejercicio15.html', titulo: 'Sueldo semanal por descuento',         ciclo: 'Para' },
  { n: 16, archivo: '/pages/ejercicio16.html', titulo: 'Cubo de numeros naturales',            ciclo: 'Mientras' },
  { n: 17, archivo: '/pages/ejercicio17.html', titulo: 'Tabla de multiplicar',                 ciclo: 'Para' },
  { n: 18, archivo: '/pages/ejercicio18.html', titulo: 'Interes compuesto (1961)',             ciclo: 'Para' },
  { n: 19, archivo: '/pages/ejercicio19.html', titulo: 'Impuesto vehicular',                   ciclo: 'Repetir' },
  { n: 20, archivo: '/pages/ejercicio20.html', titulo: 'Seno por serie',                       ciclo: 'Para' },
  { n: 21, archivo: '/pages/ejercicio21.html', titulo: 'Monedero (denominaciones)',            ciclo: 'Para' },
  { n: 22, archivo: '/pages/ejercicio22.html', titulo: 'Clientes banco AVVILLAS',              ciclo: 'Repetir' },
];

function construirNav() {
  const paginaActual = document.body.dataset.page || '/index.html'; // <- Agrega /
  const idxActual = EJERCICIOS.findIndex(e => e.archivo === paginaActual);

  const nav = document.createElement('nav');
  nav.className = 'nav-principal';

  const marca = document.createElement('div');
  marca.className = 'nav-marca';
  marca.innerHTML = `<a href="/index.html">Ejercicios Repetitivos</a><span>${idxActual >= 0 ? 'Ejercicio ' + EJERCICIOS[idxActual].n + ' de 22' : 'Menu principal'}</span>`; // <- Agrega /

  const controles = document.createElement('div');
  controles.className = 'nav-controles';

  const select = document.createElement('select');
  const optInicio = document.createElement('option');
  optInicio.value = '/index.html'; // <- Agrega /
  optInicio.textContent = 'Ir a... (menu)';
  select.appendChild(optInicio);
  EJERCICIOS.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e.archivo;
    opt.textContent = `${e.n}. ${e.titulo}`;
    if (e.archivo === paginaActual) opt.selected = true;
    select.appendChild(opt);
  });
  select.addEventListener('change', () => { window.location.href = select.value; });

  controles.appendChild(select);

  if (idxActual > 0) {
    const anterior = document.createElement('a');
    anterior.className = 'nav-btn';
    anterior.href = EJERCICIOS[idxActual - 1].archivo;
    anterior.textContent = '← Anterior';
    controles.appendChild(anterior);
  }
  if (idxActual >= 0 && idxActual < EJERCICIOS.length - 1) {
    const siguiente = document.createElement('a');
    siguiente.className = 'nav-btn';
    siguiente.href = EJERCICIOS[idxActual + 1].archivo;
    siguiente.textContent = 'Siguiente →';
    controles.appendChild(siguiente);
  }

  nav.appendChild(marca);
  nav.appendChild(controles);

  document.body.prepend(nav);
}

document.addEventListener('DOMContentLoaded', construirNav);