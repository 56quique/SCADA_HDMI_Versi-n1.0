// Importa el estado del sistema
import { estado } from "./data.js"

// Importa el simulador
import { simular } from "./simulator.js"

// Importa el creador de gauges
import { crearGauge } from "./gauges.js"

// =============================
// CREACIÓN DE INSTRUMENTOS
// =============================

// Gauge de tensión RED
const gaugeRed = crearGauge("gaugeV1", 0, 300, "V")

// Gauge de tensión GRUPO
const gaugeGrupo = crearGauge("gaugeV2", 0, 300, "V")

// =============================
// LOOP PRINCIPAL (tipo SCADA)
// =============================

let ultimoCambio = 0

function loop(timestamp) {

  // actualizar valores cada 500 ms (medio segundo)
  if (timestamp - ultimoCambio > 500) {
    simular(estado)
    ultimoCambio = timestamp
  }

  // dibujar SIEMPRE (suavizado hace el resto)
  gaugeRed.dibujar(estado.red.tension[0])
  gaugeGrupo.dibujar(estado.grupo.tension[0])

  requestAnimationFrame(loop)
}

// Arranque del sistema
loop()
