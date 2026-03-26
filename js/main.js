console.log("JS OK");
import { crearGauge } from "./gauges.js";

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

  t1.textContent = v1.toFixed(0) + " V";
  t2.textContent = v2.toFixed(0) + " V";
  t3.textContent = v3.toFixed(0) + " V";

  requestAnimationFrame(animar);
}

animar();
