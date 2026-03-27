console.log("JS OK");
import { crearGauge } from "./gauges.js";

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

// ===== ANIMACIÓN SUAVE =====
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

// ===== ACTUALIZACIÓN NUMÉRICA + LEDS =====
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

  // COLOR TEXTO
  setColor(t1, prom1);
  setColor(t2, prom2);
  setColor(t3, prom3);

  // LEDS
  actualizarLEDs(prom1, led1Alto, led1Normal, led1Bajo);
  actualizarLEDs(prom2, led2Alto, led2Normal, led2Bajo);
  actualizarLEDs(prom3, led3Alto, led3Normal, led3Bajo);

}, 500);

// ===== COLOR NUMÉRICO =====
function setColor(elemento, valor) {
  if (valor < 200 || valor > 240) {
    elemento.style.color = "red";
  } else {
    elemento.style.color = "#22c55e";
  }
}

// ===== LÓGICA LEDS =====
function actualizarLEDs(valor, alto, normal, bajo) {

  alto.classList.remove("activo");
  normal.classList.remove("activo");
  bajo.classList.remove("activo");

  if (valor > 240) {
    alto.classList.add("activo");
  } else if (valor < 200) {
    bajo.classList.add("activo");
  } else {
    normal.classList.add("activo");
  }
}
