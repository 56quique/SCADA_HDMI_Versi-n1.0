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
}