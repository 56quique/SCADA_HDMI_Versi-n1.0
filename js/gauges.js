// gauges.js

export function crearGauge(id, min, max, unidad = "") {

  const canvas = document.getElementById(id)

  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  const WIDTH = 100
const HEIGHT = 140

  canvas.width = WIDTH
  canvas.height = HEIGHT

  const MARGEN = 20
  const ALTO_UTIL = HEIGHT - 2 * MARGEN

  // =========================
  // 🔥 VALOR SUAVIZADO
  // =========================
  let valorSuavizado = min

  // qué tan rápido responde (0.05 = lento, 0.2 = rápido)
  const FACTOR_INERCIA = 0.05

  function dibujar(valorReal) {

    // =========================
    // 🔁 SUAVIZADO
    // =========================
    valorSuavizado += (valorReal - valorSuavizado) * FACTOR_INERCIA

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // =========================
    // FONDO
    // =========================
    ctx.fillStyle = "#111"
    ctx.fillRect(30, MARGEN, 60, ALTO_UTIL)

    // =========================
    // ESCALA
    // =========================
    ctx.strokeStyle = "#888"
    ctx.lineWidth = 1

    const pasos = 10

    for (let i = 0; i <= pasos; i++) {

      const y = MARGEN + (i / pasos) * ALTO_UTIL

      ctx.beginPath()
      ctx.moveTo(25, y)
      ctx.lineTo(30, y)
      ctx.stroke()

      const valorEscala = max - (i / pasos) * (max - min)

      ctx.fillStyle = "#aaa"
      ctx.font = "10px Arial"
      ctx.fillText(valorEscala.toFixed(0), 2, y + 3)
    }

    // =========================
    // NORMALIZACIÓN
    // =========================
    let porcentaje = (valorSuavizado - min) / (max - min)
    porcentaje = Math.max(0, Math.min(1, porcentaje))

    const altura = porcentaje * ALTO_UTIL

    // =========================
    // COLOR
    // =========================
    let color = "red"
    if (valorSuavizado >= 210 && valorSuavizado <= 240) {
      color = "lime"
    }

    // =========================
    // BARRA
    // =========================
    ctx.fillStyle = color
    ctx.fillRect(30, HEIGHT - MARGEN - altura, 60, altura)

    // =========================
    // BORDE
    // =========================
    ctx.strokeStyle = "#555"
    ctx.strokeRect(30, MARGEN, 60, ALTO_UTIL)

    // =========================
    // TEXTO
    // =========================
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.fillText(valorSuavizado.toFixed(1) + " " + unidad, 30, 15)
  }

  return { dibujar }
}
