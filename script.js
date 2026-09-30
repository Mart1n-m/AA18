// Referencias al DOM
const $tablero = document.querySelector("#tablero");
const $mensaje = document.querySelector("#mensaje");
const $reiniciar = document.querySelector("#reiniciar");

// Combinaciones ganadoras: 3 filas, 3 columnas y 2 diagonales
const LINEAS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Estado del juego
let tablero = Array(9).fill("");
let turno = "X";
let terminado = false;

// Crea las 9 casillas; cada una guarda su posición en data-indice
$tablero.innerHTML = tablero
  .map((_, i) => `<button class="casilla" data-indice="${i}"></button>`)
  .join("");

const $casillas = document.querySelectorAll(".casilla");

// Devuelve la línea ganadora o undefined si no hay
const buscarGanador = () =>
  LINEAS.find(([a, b, c]) => tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]);

const jugar = (i) => {
  // No se puede marcar una casilla ocupada ni seguir si terminó
  if (tablero[i] || terminado) return;

  tablero[i] = turno;
  $casillas[i].textContent = turno;

  const linea = buscarGanador();

  if (linea) {
    linea.forEach((j) => $casillas[j].classList.add("ganadora"));
    $mensaje.textContent = `¡Ganó ${turno}!`;
    terminado = true;
  } else if (tablero.every((casilla) => casilla)) {
    $mensaje.textContent = "¡Empate!";
    terminado = true;
  } else {
    turno = turno === "X" ? "O" : "X";
    $mensaje.textContent = `Turno de ${turno}`;
  }
};

const reiniciar = () => {
  tablero = Array(9).fill("");
  turno = "X";
  terminado = false;
  $mensaje.textContent = "Turno de X";
  $casillas.forEach(($casilla) => {
    $casilla.textContent = "";
    $casilla.classList.remove("ganadora");
  });
};

// Un solo listener en el tablero (delegación de eventos)
$tablero.addEventListener("click", (evento) => {
  const $casilla = evento.target.closest(".casilla");
  if ($casilla) jugar(Number($casilla.dataset.indice));
});

$reiniciar.addEventListener("click", reiniciar);
