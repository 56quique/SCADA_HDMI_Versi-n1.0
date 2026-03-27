import { crearGauge } from "./gauge.js"

const g1 = crearGauge("gaugeL1")
const g2 = crearGauge("gaugeL2")
const g3 = crearGauge("gaugeL3")

function simularValor() {
  return 180 + Math.random() * 80
}

function actualizar() {
  const v1 = simularValor()
  const v2 = simularValor()
  const v3 = simularValor()

  g1.dibujar(v1)
  g2.dibujar(v2)
  g3.dibujar(v3)
}

setInterval(actualizar, 500)
