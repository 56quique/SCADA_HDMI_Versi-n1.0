//====== VERSIÓN 1 ==========

/*
// gauges.js (versión PRO estilo industrial)

export function crearGauge(id, min, max, unidad = "") {

  const canvas = document.getElementById(id)

  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  // Tamaño (coincide con CSS)
  const WIDTH = 80
  const HEIGHT = 140

  canvas.width = WIDTH
  canvas.height = HEIGHT

  const MARGEN = 15
  const ALTO_UTIL = HEIGHT - 2 * MARGEN

  // Geometría PRO
  const GAUGE_W = 18
  const GAUGE_X = WIDTH / 2 - GAUGE_W / 2

  // Inercia
  let valorSuavizado = min
  const FACTOR_INERCIA = 0.1

  function dibujar(valorReal) {

    // Suavizado
    valorSuavizado += (valorReal - valorSuavizado) * FACTOR_INERCIA

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // =========================
    // FONDO DEL GAUGE
    // =========================
    ctx.fillStyle = "#111"
    ctx.fillRect(GAUGE_X, MARGEN, GAUGE_W, ALTO_UTIL)

    // =========================
    // ESCALA
    // =========================
    ctx.strokeStyle = "#777"
    ctx.lineWidth = 1

    const pasos = 8

    for (let i = 0; i <= pasos; i++) {

      const y = MARGEN + (i / pasos) * ALTO_UTIL

      ctx.beginPath()
      ctx.moveTo(GAUGE_X - 6, y)
      ctx.lineTo(GAUGE_X, y)
      ctx.stroke()

      const valorEscala = max - (i / pasos) * (max - min)

      ctx.fillStyle = "#aaa"
      ctx.font = "10px monospace"
      ctx.textAlign = "right"
      ctx.fillText(valorEscala.toFixed(0), GAUGE_X - 8, y + 3)
    }

    // =========================
    // NORMALIZACIÓN
    // =========================
    let porcentaje = (valorSuavizado - min) / (max - min)
    porcentaje = Math.max(0, Math.min(1, porcentaje))

    const altura = porcentaje * ALTO_UTIL

    // =========================
    // COLOR POR RANGO (TENSIÓN)
    // =========================
    let color = "#ff3030"

    if (valorSuavizado >= 210 && valorSuavizado <= 240) {
      color = "#00ff00"
    }

    // =========================
    // BARRA
    // =========================
    ctx.fillStyle = color
    ctx.fillRect(GAUGE_X, HEIGHT - MARGEN - altura, GAUGE_W, altura)

    // =========================
    // BORDE
    // =========================
    ctx.strokeStyle = "#555"
    ctx.strokeRect(GAUGE_X, MARGEN, GAUGE_W, ALTO_UTIL)

    // =========================
    // VALOR NUMÉRICO
    // =========================
    ctx.fillStyle = "#00ff00"
    ctx.font = "bold 11px monospace"
    ctx.textAlign = "center"
    ctx.fillText(valorSuavizado.toFixed(1) + " " + unidad, WIDTH / 2, HEIGHT - 5)
  }

  return { dibujar }
} */

// ==== VERSIÓN 2 =====

// gauges.js (OPCIÓN 2 - estilo zonas industriales)

/*
export function crearGauge(id, min, max, unidad = "") {

  const canvas = document.getElementById(id)

  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  const WIDTH = 80
  const HEIGHT = 140

  canvas.width = WIDTH
  canvas.height = HEIGHT

  const MARGEN = 15
  const ALTO_UTIL = HEIGHT - 2 * MARGEN

  const GAUGE_W = 16
  const GAUGE_X = WIDTH / 2 - GAUGE_W / 2

  let valorSuavizado = min
  const FACTOR_INERCIA = 0.1

  function dibujar(valorReal) {

    valorSuavizado += (valorReal - valorSuavizado) * FACTOR_INERCIA

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // =========================
    // FONDO BASE
    // =========================
    ctx.fillStyle = "#111"
    ctx.fillRect(GAUGE_X, MARGEN, GAUGE_W, ALTO_UTIL)

    // =========================
    // ZONAS (ROJO - VERDE - ROJO)
    // =========================
    const rango = max - min

    const yMin = HEIGHT - MARGEN
    const yMax = MARGEN

    const y210 = yMin - ((210 - min) / rango) * ALTO_UTIL
    const y240 = yMin - ((240 - min) / rango) * ALTO_UTIL

    // Zona baja (roja)
    ctx.fillStyle = "#401010"
    ctx.fillRect(GAUGE_X, y210, GAUGE_W, yMin - y210)

    // Zona normal (verde)
    ctx.fillStyle = "#103010"
    ctx.fillRect(GAUGE_X, y240, GAUGE_W, y210 - y240)

    // Zona alta (roja)
    ctx.fillStyle = "#401010"
    ctx.fillRect(GAUGE_X, yMax, GAUGE_W, y240 - yMax)

    // =========================
    // ESCALA
    // =========================
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 1

    const pasos = 8

    for (let i = 0; i <= pasos; i++) {

      const y = MARGEN + (i / pasos) * ALTO_UTIL

      ctx.beginPath()
      ctx.moveTo(GAUGE_X - 6, y)
      ctx.lineTo(GAUGE_X, y)
      ctx.stroke()

      const valorEscala = max - (i / pasos) * rango

      ctx.fillStyle = "#aaa"
      ctx.font = "10px monospace"
      ctx.textAlign = "right"
      ctx.fillText(valorEscala.toFixed(0), GAUGE_X - 8, y + 3)
    }

    // =========================
    // VALOR NORMALIZADO
    // =========================
    let porcentaje = (valorSuavizado - min) / rango
    porcentaje = Math.max(0, Math.min(1, porcentaje))

    const altura = porcentaje * ALTO_UTIL

    // =========================
    // BARRA ACTIVA (más fina)
    // =========================
    ctx.fillStyle = "#00ff00"
    ctx.fillRect(
      GAUGE_X + GAUGE_W / 2 - 2,
      HEIGHT - MARGEN - altura,
      4,
      altura
    )

    // =========================
    // BORDE
    // =========================
    ctx.strokeStyle = "#444"
    ctx.strokeRect(GAUGE_X, MARGEN, GAUGE_W, ALTO_UTIL)

    // =========================
    // VALOR NUMÉRICO
    // =========================
    ctx.fillStyle = "#0f0"
    ctx.font = "bold 11px monospace"
    ctx.textAlign = "center"
    ctx.fillText(valorSuavizado.toFixed(1) + " " + unidad, WIDTH / 2, HEIGHT - 5)
  }

  return { dibujar }
} */

// ======== VERSIÓN 3 ========

// gauges.js (OPCIÓN 3 - estilo monocromo profesional)

/*
export function crearGauge(id, min, max, unidad = "") {

  const canvas = document.getElementById(id)

  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  const WIDTH = 80
  const HEIGHT = 140

  canvas.width = WIDTH
  canvas.height = HEIGHT

  const MARGEN = 15
  const ALTO_UTIL = HEIGHT - 2 * MARGEN

  const GAUGE_W = 14
  const GAUGE_X = WIDTH / 2 - GAUGE_W / 2

  let valorSuavizado = min
  const FACTOR_INERCIA = 0.1

  function dibujar(valorReal) {

    valorSuavizado += (valorReal - valorSuavizado) * FACTOR_INERCIA

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // =========================
    // FONDO
    // =========================
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(GAUGE_X, MARGEN, GAUGE_W, ALTO_UTIL)

    // =========================
    // ESCALA
    // =========================
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 1

    const pasos = 8

    for (let i = 0; i <= pasos; i++) {

      const y = MARGEN + (i / pasos) * ALTO_UTIL

      ctx.beginPath()
      ctx.moveTo(GAUGE_X - 5, y)
      ctx.lineTo(GAUGE_X, y)
      ctx.stroke()

      const valorEscala = max - (i / pasos) * (max - min)

      ctx.fillStyle = "#999"
      ctx.font = "10px monospace"
      ctx.textAlign = "right"
      ctx.fillText(valorEscala.toFixed(0), GAUGE_X - 7, y + 3)
    }

    // =========================
    // NORMALIZACIÓN
    // =========================
    let porcentaje = (valorSuavizado - min) / (max - min)
    porcentaje = Math.max(0, Math.min(1, porcentaje))

    const altura = porcentaje * ALTO_UTIL

    // =========================
    // BARRA (GRIS CLARO)
    // =========================
    ctx.fillStyle = "#cccccc"
    ctx.fillRect(GAUGE_X, HEIGHT - MARGEN - altura, GAUGE_W, altura)

    // =========================
    // BORDE
    // =========================
    ctx.strokeStyle = "#444"
    ctx.strokeRect(GAUGE_X, MARGEN, GAUGE_W, ALTO_UTIL)

    // =========================
    // LÍNEA DE REFERENCIA (opcional)
    // =========================
    ctx.strokeStyle = "#888"
    ctx.beginPath()
    ctx.moveTo(GAUGE_X, HEIGHT - MARGEN - altura)
    ctx.lineTo(GAUGE_X + GAUGE_W, HEIGHT - MARGEN - altura)
    ctx.stroke()

    // =========================
    // VALOR NUMÉRICO
    // =========================
    ctx.fillStyle = "#e0e0e0"
    ctx.font = "bold 11px monospace"
    ctx.textAlign = "center"
    ctx.fillText(valorSuavizado.toFixed(1) + " " + unidad, WIDTH / 2, HEIGHT - 5)
  }

  return { dibujar }
} */

// ====== VERSIÓN 4 ========

// gauges.js (versión limpia, escala por rangos + valor separado)

export function crearGauge(id, min, max, unidad = "") {

  const canvas = document.getElementById(id)

  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  const WIDTH = 80
  const HEIGHT = 140

  canvas.width = WIDTH
  canvas.height = HEIGHT

  // ===== MÁRGENES =====
  const MARGEN_SUP = 12
  const MARGEN_INF = 28   // espacio reservado para el valor
  const ALTO_UTIL = HEIGHT - MARGEN_SUP - MARGEN_INF

  const GAUGE_W = 18
  const GAUGE_X = WIDTH / 2 - GAUGE_W / 2

  let valorSuavizado = min
  const FACTOR_INERCIA = 0.1

  function dibujar(valorReal) {

    // Suavizado
    valorSuavizado += (valorReal - valorSuavizado) * FACTOR_INERCIA

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // =========================
    // FONDO DEL GAUGE
    // =========================
    ctx.fillStyle = "#111"
    ctx.fillRect(GAUGE_X, MARGEN_SUP, GAUGE_W, ALTO_UTIL)

    // =========================
    // ESCALA CON COLOR POR RANGO
    // =========================
    const pasos = 8

    for (let i = 0; i <= pasos; i++) {

      const y = MARGEN_SUP + (i / pasos) * ALTO_UTIL
      const valorEscala = max - (i / pasos) * (max - min)

      // Color por rango
      let colorEscala = "#aaa"

      if (valorEscala < 210) {
        colorEscala = "#ffd000"   // amarillo
      } else if (valorEscala <= 230) {
        colorEscala = "#00ff00"   // verde
      } else {
        colorEscala = "#ff3030"   // rojo
      }

      // Línea de escala
      ctx.strokeStyle = "#666"
      ctx.beginPath()
      ctx.moveTo(GAUGE_X - 6, y)
      ctx.lineTo(GAUGE_X, y)
      ctx.stroke()

      // Número
      ctx.fillStyle = colorEscala
      ctx.font = "10px monospace"
      ctx.textAlign = "right"
      ctx.fillText(valorEscala.toFixed(0), GAUGE_X - 8, y + 3)
    }

    // =========================
    // NORMALIZACIÓN
    // =========================
    let porcentaje = (valorSuavizado - min) / (max - min)
    porcentaje = Math.max(0, Math.min(1, porcentaje))

    const altura = porcentaje * ALTO_UTIL

    // =========================
    // BARRA (GRIS)
    // =========================
    ctx.fillStyle = "#d0d0d0"
    ctx.fillRect(
      GAUGE_X,
      HEIGHT - MARGEN_INF - altura,
      GAUGE_W,
      altura
    )

    // =========================
    // BORDE
    // =========================
    ctx.strokeStyle = "#444"
    ctx.strokeRect(GAUGE_X, MARGEN_SUP, GAUGE_W, ALTO_UTIL)

    // =========================
    // VALOR NUMÉRICO (ABAJO SEPARADO)
    // =========================
    ctx.fillStyle = "#e0e0e0"
    ctx.font = "bold 11px monospace"
    ctx.textAlign = "center"
    ctx.fillText(
      valorSuavizado.toFixed(1) + " " + unidad,
      WIDTH / 2,
      HEIGHT - 8
    )
  }

  return { dibujar }
}