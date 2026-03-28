// gauges.js

export function crearGauge(id, min, max, unidad = "") {

  const canvas = document.getElementById(id)

  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  // Tamaño real del canvas
  const WIDTH = 120
  const HEIGHT = 300

  canvas.width = WIDTH
  canvas.height = HEIGHT

  const MARGEN = 20
  const ALTO_UTIL = HEIGHT - 2 * MARGEN

  // =========================
  // FUNCION DE DIBUJO
  // =========================
  function dibujar(valor) {

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // =========================
    // FONDO DEL GAUGE
    // =========================
    ctx.fillStyle = "#111"
    ctx.fillRect(30, MARGEN, 60, ALTO_UTIL)

    // =========================
    // ESCALA (líneas)
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

      // valor numérico de la escala
      const valorEscala = max - (i / pasos) * (max - min)

      ctx.fillStyle = "#aaa"
      ctx.font = "10px Arial"
      ctx.fillText(valorEscala.toFixed(0), 2, y + 3)
    }

    // =========================
    // CALCULO DE ALTURA
    // =========================
    let porcentaje = (valor - min) / (max - min)

    // limitar entre 0 y 1
    porcentaje = Math.max(0, Math.min(1, porcentaje))

    const altura = porcentaje * ALTO_UTIL

    // =========================
    // COLOR SEGÚN RANGO
    // =========================
    let color = "red"

    if (valor >= 210 && valor <= 240) {
      color = "lime"
    }

    // =========================
    // BARRA DE VALOR
    // =========================
    ctx.fillStyle = color
    ctx.fillRect(30, HEIGHT - MARGEN - altura, 60, altura)

    // =========================
    // BORDE
    // =========================
    ctx.strokeStyle = "#555"
    ctx.strokeRect(30, MARGEN, 60, ALTO_UTIL)

    // =========================
    // VALOR NUMÉRICO
    // =========================
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.fillText(valor.toFixed(1) + " " + unidad, 30, 15)
  }

  return { dibujar }
}
