// Importa el estado del sistema
import { estado } from "./data.js"

// Importa el simulador
import { simular } from "./simulator.js"

// Importa el creador de gauges
import { crearGauge } from "./gauges.js"

// =============================
// CREACIÓN DE INSTRUMENTOS
// =============================

// RED
const redV1 = crearGauge("redV1", 0, 300, "V")
const redV2 = crearGauge("redV2", 0, 300, "V")
const redV3 = crearGauge("redV3", 0, 300, "V")

// GRUPO
const grupoV1 = crearGauge("grupoV1", 0, 300, "V")
const grupoV2 = crearGauge("grupoV2", 0, 300, "V")
const grupoV3 = crearGauge("grupoV3", 0, 300, "V")

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
 redV1.dibujar(estado.red.tension[0])
redV2.dibujar(estado.red.tension[1])
redV3.dibujar(estado.red.tension[2])

grupoV1.dibujar(estado.grupo.tension[0])
grupoV2.dibujar(estado.grupo.tension[1])
grupoV3.dibujar(estado.grupo.tension[2])

  requestAnimationFrame(loop)
}

// Arranque del sistema
loop()
