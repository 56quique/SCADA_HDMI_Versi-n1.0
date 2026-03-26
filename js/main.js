import { crearGauge } from "./gauge.js";

const g1 = crearGauge("vL1", 0, 300);
const g2 = crearGauge("vL2", 0, 300);
const g3 = crearGauge("vL3", 0, 300);

const t1 = document.getElementById("tL1");
const t2 = document.getElementById("tL2");
const t3 = document.getElementById("tL3");

// Simulación tipo red trifásica
setInterval(() => {

  const v1 = 210 + Math.random() * 30;
  const v2 = 220 + Math.random() * 20;
  const v3 = 200 + Math.random() * 40;

  g1.set(v1);
  g2.set(v2);
  g3.set(v3);

  t1.textContent = v1.toFixed(0) + " V";
  t2.textContent = v2.toFixed(0) + " V";
  t3.textContent = v3.toFixed(0) + " V";

}, 1000);
