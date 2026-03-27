console.log("JS OK");
import { crearGauge } from "./gauges.js";

// ===== CONTROLES =====
// L1
const min1 = document.getElementById("min1");
const max1 = document.getElementById("max1");
const min1Val = document.getElementById("min1-val");
const max1Val = document.getElementById("max1-val");

// L2
const min2 = document.getElementById("min2");
const max2 = document.getElementById("max2");
const min2Val = document.getElementById("min2-val");
const max2Val = document.getElementById("max2-val");

// L3
const min3 = document.getElementById("min3");
const max3 = document.getElementById("max3");
const min3Val = document.getElementById("min3-val");
const max3Val = document.getElementById("max3-val");

// mostrar valores sliders
function actualizarDisplays() {
  min1Val.textContent = min1.value;
  max1Val.textContent = max1.value;

  min2Val.textContent = min2.value;
  max2Val.textContent = max2.value;

  min3Val.textContent = min3.value;
  max3Val.textContent = max3.value;
}
setInterval(actualizarDisplays, 200);

// ===== HISTORIAL PROMEDIO =====
let hist1 = [];
let hist2 = [];
let hist3 = [];
const N = 10;

// ===== GAUGES =====
const g1 = crearGauge("vL1", 0, 300);
const g2 = crearGauge("vL2", 0, 300);
const g3 = crearGauge("vL3", 0, 300);

// ===== TEXTOS =====
const t1 = document.getElementById("tL1");
const t2 = document.getElementById("tL2");
const t3 = document.getElementById("tL3");

// ===== LEDS =====
const led1Alto = document.getElementById("led1-alto");
const led1Normal = document.getElementById("led1-normal");
const led1Bajo = document.getElementById("led1-bajo");

const led2Alto = document.getElementById("led2-alto");
const led2Normal = document.getElementById("led2-normal");
const led2Bajo = document.getElementById("led2-bajo");

const led3Alto = document.getElementById("led3-alto");
const led3Normal = document.getElementById("led3-normal");
const led3Bajo = document.getElementById("led3-bajo");

// ===== VALORES =====
let v1 = 220;
let v2 = 225;
let v3 = 215;

let target1 = v1;
let target2 = v2;
let target3 = v3;

// ===== CAMBIO DE OBJETIVO =====
setInterval(() => {
  target1 = 210 + Math.random() * 30;
  target2 = 220 + Math.random() * 20;
  target3 = 200 + Math.random() * 40;
}, 3000);

// ===== ANIMACIÓN =====
function animar() {

  const ruido1 = (Math.random() - 0.5) * 1.5;
  const ruido2 = (Math.random() - 0.5) * 1.5;
  const ruido3 = (Math.random() - 0.5) * 1.5;

  v1 += (target1 - v1) * 0.02 + ruido1;
  v2 += (target2 - v2) * 0.02 + ruido2;
  v3 += (target3 - v3) * 0.02 + ruido3;

  g1.set(v1);
  g2.set(v2);
  g3.set(v3);

  requestAnimationFrame(animar);
}
animar();

// ===== ACTUALIZACIÓN NUMÉRICA + LÓGICA =====
setInterval(() => {

  // HISTORIAL
  hist1.push(v1);
  hist2.push(v2);
  hist3.push(v3);

  if (hist1.length > N) hist1.shift();
  if (hist2.length > N) hist2.shift();
  if (hist3.length > N) hist3.shift();

  // PROMEDIO
  const prom1 = hist1.reduce((a, b) => a + b, 0) / hist1.length;
  const prom2 = hist2.reduce((a, b) => a + b, 0) / hist2.length;
  const prom3 = hist3.reduce((a, b) => a + b, 0) / hist3.length;

  // TEXTO
  t1.textContent = prom1.toFixed(0) + " V";
  t2.textContent = prom2.toFixed(0) + " V";
  t3.textContent = prom3.toFixed(0) + " V";

  // ===== USAR POTENCIÓMETROS =====
  const minVal1 = +min1.value;
  const maxVal1 = +max1.value;

  const minVal2 = +min2.value;
  const maxVal2 = +max2.value;

  const minVal3 = +min3.value;
  const maxVal3 = +max3.value;
  // actualizar líneas del gauge
g1.setThresholds(minVal1, maxVal1);
g2.setThresholds(minVal2, maxVal2);
g3.setThresholds(minVal3, maxVal3);

  // COLOR TEXTO
  setColor(t1, prom1, minVal1, maxVal1);
  setColor(t2, prom2, minVal2, maxVal2);
  setColor(t3, prom3, minVal3, maxVal3);

  // LEDS
  actualizarLEDs(prom1, minVal1, maxVal1, led1Alto, led1Normal, led1Bajo);
  actualizarLEDs(prom2, minVal2, maxVal2, led2Alto, led2Normal, led2Bajo);
  actualizarLEDs(prom3, minVal3, maxVal3, led3Alto, led3Normal, led3Bajo);

}, 500);

// ===== COLOR DINÁMICO =====
function setColor(elemento, valor, min, max) {
  if (valor < min || valor > max) {
    elemento.style.color = "red";
  } else {
    elemento.style.color = "#22c55e";
  }
}

// ===== LEDS DINÁMICOS =====
function actualizarLEDs(valor, min, max, alto, normal, bajo) {

  alto.classList.remove("activo");
  normal.classList.remove("activo");
  bajo.classList.remove("activo");

  if (valor > max) {
    alto.classList.add("activo");
  } else if (valor < min) {
    bajo.classList.add("activo");
  } else {
    normal.classList.add("activo");
  }
}
