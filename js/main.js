import { crearGauge } from "./gauges.js"

const g1 = crearGauge("gaugeL1")
const g2 = crearGauge("gaugeL2")
const g3 = crearGauge("gaugeL3")

function render() {
  g1.dibujar()
  g2.dibujar()
  g3.dibujar()
}

render()
