let M = 0, salonActual = 0;
let estudiantesEnSalon = 0, estudianteActual = 0;
let sumaEdadesSalon = 0;
let sumaEdadesEscuela = 0, totalEstudiantesEscuela = 0;
let resultadosSalones = [];

const panelInicio = document.getElementById('panel-inicio');
const panelNum = document.getElementById('panel-num-estudiantes');
const panelEdad = document.getElementById('panel-edad');
const panelResultado = document.getElementById('panel-resultado');

document.getElementById('btn-iniciar').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('salones').value);
  if (isNaN(valor) || valor <= 0) return;

  M = valor; salonActual = 0; resultadosSalones = [];
  sumaEdadesEscuela = 0; totalEstudiantesEscuela = 0;
  document.getElementById('cuerpo-tabla').innerHTML = '';

  panelInicio.classList.add('oculto');
  irASalon();
});

function irASalon() {
  salonActual++;
  estudiantesEnSalon = 0;
  document.getElementById('texto-progreso-salon').textContent = `Salón ${salonActual} de ${M}`;
  document.getElementById('barra-salon').style.width = `${((salonActual - 1) / M) * 100}%`;
  document.getElementById('num-estudiantes').value = '';
  panelEdad.classList.add('oculto');
  panelResultado.classList.add('oculto');
  panelNum.classList.remove('oculto');
  document.getElementById('num-estudiantes').focus();
}

document.getElementById('btn-continuar-salon').addEventListener('click', () => {
  const valor = parseInt(document.getElementById('num-estudiantes').value);
  if (isNaN(valor) || valor <= 0) return;

  estudiantesEnSalon = valor;
  estudianteActual = 0;
  sumaEdadesSalon = 0;

  panelNum.classList.add('oculto');
  panelEdad.classList.remove('oculto');
  actualizarProgresoEstudiante();
  document.getElementById('edad').value = '';
  document.getElementById('edad').focus();
});

function actualizarProgresoEstudiante() {
  document.getElementById('texto-progreso-estudiante').textContent = `Salón ${salonActual} · Estudiante ${estudianteActual + 1} de ${estudiantesEnSalon}`;
  document.getElementById('barra-estudiante').style.width = `${(estudianteActual / estudiantesEnSalon) * 100}%`;
}

document.getElementById('btn-registrar-edad').addEventListener('click', () => {
  const edad = parseFloat(document.getElementById('edad').value);
  if (isNaN(edad) || edad < 0) return;

  // ---- Ciclo interno: recorre los estudiantes del salón actual ----
  sumaEdadesSalon += edad;
  estudianteActual++;

  if (estudianteActual >= estudiantesEnSalon) {
    // Terminó el salón: calcular su promedio
    const promedioSalon = sumaEdadesSalon / estudiantesEnSalon;
    resultadosSalones.push({ salon: salonActual, estudiantes: estudiantesEnSalon, promedio: promedioSalon });

    sumaEdadesEscuela += sumaEdadesSalon;
    totalEstudiantesEscuela += estudiantesEnSalon;

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>Salón ${salonActual}</td><td class="num">${estudiantesEnSalon}</td><td class="num">${promedioSalon.toFixed(1)}</td>`;
    document.getElementById('cuerpo-tabla').appendChild(fila);

    // ---- Ciclo externo: recorre los M salones ----
    if (salonActual >= M) {
      mostrarResultadoFinal();
    } else {
      irASalon();
    }
  } else {
    actualizarProgresoEstudiante();
    document.getElementById('edad').value = '';
    document.getElementById('edad').focus();
  }
});

function mostrarResultadoFinal() {
  panelEdad.classList.add('oculto');
  panelResultado.classList.remove('oculto');
  const promedioEscuela = sumaEdadesEscuela / totalEstudiantesEscuela;
  document.getElementById('promedio-escuela').textContent = promedioEscuela.toFixed(1) + ' años';
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
  document.getElementById('salones').value = '';
  panelResultado.classList.add('oculto');
  panelInicio.classList.remove('oculto');
});