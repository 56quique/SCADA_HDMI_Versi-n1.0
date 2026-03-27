import { crearGauge } from "./gauge.js"

const g1 = crearGauge("gaugeL1")
const g2 = crearGauge("gaugeL2")
const g3 = crearGauge("gaugeL3")

function actualizarLED(fase, valor, umin, umax) {
  document.getElementById(`${fase}_red`).style.opacity = valor > umax ? 1 : 0.2
  document.getElementById(`${fase}_yellow`).style.opacity = valor < umin ? 1 : 0.2
  document.getElementById(`${fase}_green`).style.opacity =
    valor >= umin && valor <= umax ? 1 : 0.2
}

function simular() {
  const umin = parseInt(document.getElementById("umin").value)
  const umax = parseInt(document.getElementById("umax").value)

  const v1 = 180 + Math.random() * 80
  const v2 = 180 + Math.random() * 80
  const v3 = 180 + Math.random() * 80

  g1.dibujar(v1, umin, umax)
  g2.dibujar(v2, umin, umax)
  g3.dibujar(v3, umin, umax)

  actualizarLED("L1", v1, umin, umax)
  actualizarLED("L2", v2, umin, umax)
  actualizarLED("L3", v3, umin, umax)
}

setInterval(simular, 500)
