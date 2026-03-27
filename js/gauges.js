export function crearGauge(canvasId) {
  const canvas = document.getElementById(canvasId)

  if (!canvas) {
    console.error("Canvas no encontrado:", canvasId)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  canvas.width = 120
  canvas.height = 300

  const W = canvas.width
  const H = canvas.height

  function dibujar(valor = 0) {
    ctx.clearRect(0, 0, W, H)

    // Fondo
    ctx.fillStyle = "#050f1f"
    ctx.fillRect(0, 0, W, H)

    // Canal
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(40, 10, 40, H - 20)

    // ===== ESCALA =====
    for (let v = 0; v <= 300; v += 10) {
      const y = H - (v / 300) * (H - 20) - 10
      const esMayor = (v % 30 === 0)

      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(esMayor ? 80 : 70, y)
      ctx.strokeStyle = "#9fb3c8"
      ctx.lineWidth = esMayor ? 2 : 1
      ctx.stroke()

      if (esMayor) {
        ctx.fillStyle = "#cfe3ff"
        ctx.font = "10px Arial"
        ctx.fillText(v, 5, y + 3)
      }
    }

    // ===== CURSOR =====
    const yVal = H - (valor / 300) * (H - 20) - 10

    // barra principal
    ctx.fillStyle = "#00e0ff"
    ctx.fillRect(40, yVal - 2, 40, 4)

    // punta lateral (tipo instrumento)
    ctx.beginPath()
    ctx.moveTo(85, yVal)
    ctx.lineTo(100, yVal - 6)
    ctx.lineTo(100, yVal + 6)
    ctx.closePath()
    ctx.fillStyle = "#00e0ff"
    ctx.fill()
  }

  return { dibujar }
}
