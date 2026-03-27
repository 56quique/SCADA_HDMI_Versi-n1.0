export function crearGauge(canvasId) {
  const canvas = document.getElementById(canvasId)

  if (!canvas) {
    console.error("Canvas no encontrado:", canvasId)
    return { dibujar: () => {} }
  }

  const ctx = canvas.getContext("2d")

  // Tamaño real interno (IMPORTANTE para que no se deforme)
  canvas.width = 120
  canvas.height = 300

  const W = canvas.width
  const H = canvas.height

  function dibujarEscala() {
    ctx.clearRect(0, 0, W, H)

    // Fondo del instrumento
    ctx.fillStyle = "#050f1f"
    ctx.fillRect(0, 0, W, H)

    // Canal del gauge
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

      // Números solo en ticks grandes
      if (esMayor) {
        ctx.fillStyle = "#cfe3ff"
        ctx.font = "10px Arial"
        ctx.fillText(v, 5, y + 3)
      }
    }
  }

  return {
    dibujar: dibujarEscala
  }
}
