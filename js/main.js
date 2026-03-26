console.log("JS OK");
import { crearGauge } from "./gauges.js";

let hist1 = [];
let hist2 = [];
let hist3 = [];

const N = 10; // cantidad de muestras para promedio
const g1 = crearGauge("vL1", 0, 300);
const g2 = crearGauge("vL2", 0, 300);
const g3 = crearGauge("vL3", 0, 300);

const t1 = document.getElementById("tL1");
const t2 = document.getElementById("tL2");
const t3 = document.getElementById("tL3");

// valores actuales
let v1 = 220;
let v2 = 225;
let v3 = 215;

// valores objetivo
let target1 = v1;
let target2 = v2;
let target3 = v3;

// cada 3 segundos cambia el objetivo
setInterval(() => {
  target1 = 210 + Math.random() * 30;
  target2 = 220 + Math.random() * 20;
  target3 = 200 + Math.random() * 40;
}, 3000);

// animación continua (suave)
function animar() {

  // interpolación (suavizado)
 // ruido pequeño
const ruido1 = (Math.random() - 0.5) * 1.5;
const ruido2 = (Math.random() - 0.5) * 1.5;
const ruido3 = (Math.random() - 0.5) * 1.5;

// interpolación + ruido
v1 += (target1 - v1) * 0.02 + ruido1;
v2 += (target2 - v2) * 0.02 + ruido2;
v3 += (target3 - v3) * 0.02 + ruido3;

  g1.set(v1);
  g2.set(v2);
  g3.set(v3);

 

  requestAnimationFrame(animar);
}

animar();
// actualización lenta del valor numérico
setInterval(() => {

  // guardar historial
  hist1.push(v1);
  hist2.push(v2);
  hist3.push(v3);

  if (hist1.length > N) hist1.shift();
  if (hist2.length > N) hist2.shift();
  if (hist3.length > N) hist3.shift();

  // calcular promedio
  const prom1 = hist1.reduce((a, b) => a + b, 0) / hist1.length;
  const prom2 = hist2.reduce((a, b) => a + b, 0) / hist2.length;
  const prom3 = hist3.reduce((a, b) => a + b, 0) / hist3.length;

  // mostrar
  t1.textContent = prom1.toFixed(0) + " V";
  t2.textContent = prom2.toFixed(0) + " V";
  t3.textContent = prom3.toFixed(0) + " V";

  // ===== COLOR SEGÚN RANGO =====
  setColor(t1, prom1);
  setColor(t2, prom2);
  setColor(t3, prom3);

}, 500);
function setColor(elemento, valor) {

  if (valor < 200 || valor > 240) {
    elemento.style.color = "red";
  } else {
    elemento.style.color = "#22c55e"; // verde
  }

}
