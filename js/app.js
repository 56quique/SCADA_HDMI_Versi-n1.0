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
const gaugeRed = crearGauge("gaugeV1", 0, 300)

// Gauge de tensión GRUPO
const gaugeGrupo = crearGauge("gaugeV2", 0, 300)

// =============================
// LOOP PRINCIPAL (tipo SCADA)
// =============================

function loop() {

  // Actualiza los datos (simulación)
  simular(estado)

  // Dibuja valores en los instrumentos
  gaugeRed.dibujar(estado.red.tension[0])
  gaugeGrupo.dibujar(estado.grupo.tension[0])

  // Repite el ciclo (animación continua)
  requestAnimationFrame(loop)
}

// Arranque del sistema
loop()
