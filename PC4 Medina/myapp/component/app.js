import { cargarEntrenadores } from './entrenadores.js';

document.addEventListener('DOMContentLoaded', () => {
  cargarEntrenadores(); 
});

// entrenadores.js
export async function cargarEntrenadores() {
  try {
    const response = await fetch('entrenadores.json');
    if (!response.ok) {
      throw new Error('No se pudo cargar la lista de entrenadores');
    }
    const entrenadores = await response.json();
    mostrarEntrenadores(entrenadores);
  } catch (error) {
    console.error(error);
  }
}

function mostrarEntrenadores(entrenadores) {
  const entrenadoresDiv = document.getElementById('entrenadores');
  entrenadoresDiv.innerHTML = ''; 

  entrenadores.forEach(entrenador => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const nombreEntrenador = document.createElement('h5');
    nombreEntrenador.classList.add('card-title');
    nombreEntrenador.textContent = entrenador.entrenador;

    const seleccionarParaCombateBtn = document.createElement('button');
    seleccionarParaCombateBtn.classList.add('btn', 'btn-success');
    seleccionarParaCombateBtn.textContent = 'Seleccionar para combate';
    seleccionarParaCombateBtn.addEventListener('click', () => seleccionarParaCombate(entrenador));

    cardBody.appendChild(nombreEntrenador);
    cardBody.appendChild(seleccionarParaCombateBtn);

    card.appendChild(cardBody);
    entrenadoresDiv.appendChild(card);
  });
}

let entrenador1 = null;
let entrenador2 = null;

function seleccionarParaCombate(entrenador) {
  if (!entrenador1) {
    entrenador1 = entrenador;
  } else if (!entrenador2) {
    entrenador2 = entrenador;
    mostrarMensajeCombate();
  } else {
    console.log('Ya se han seleccionado dos entrenadores para el combate');
  }
}

function mostrarMensajeCombate() {
  const combateDiv = document.getElementById('combate');
  combateDiv.innerHTML = '';

  const mensaje = document.createElement('p');
  mensaje.textContent = `Se realizará un nuevo combate entre ${entrenador1.entrenador} vs ${entrenador2.entrenador}`;
  combateDiv.appendChild(mensaje);

  const nuevoCombateBtn = document.createElement('button');
  nuevoCombateBtn.classList.add('btn', 'btn-info');
  nuevoCombateBtn.textContent = 'Nuevo combate';
  nuevoCombateBtn.addEventListener('click', iniciarNuevoCombate);
  nuevoCombateBtn.disabled = !(entrenador1 && entrenador2);

  combateDiv.appendChild(nuevoCombateBtn);
}

function iniciarNuevoCombate() {
  console.log(`Iniciar nuevo combate entre ${entrenador1.entrenador} vs ${entrenador2.entrenador}`);
}
