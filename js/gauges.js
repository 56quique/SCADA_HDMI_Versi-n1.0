export function crearGauge(canvasId) {
  const canvas = document.getElementById(canvasId)
  const ctx = canvas.getContext("2d")

  canvas.width = 120
  canvas.height = 300

  function dibujar(valor, umin, umax) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const h = canvas.height
    const w = canvas.width

    // Fondo escala
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(40, 10, 40, h - 20)

    // Escala
    for (let v = 0; v <= 300; v += 10) {
      const y = h - (v / 300) * h

      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(v % 30 === 0 ? 80 : 70, y)
      ctx.strokeStyle = "#aaa"
      ctx.stroke()
    }

    // Líneas Umin / Umax
    const yMin = h - (umin / 300) * h
    const yMax = h - (umax / 300) * h

    ctx.strokeStyle = "yellow"
    ctx.beginPath()
    ctx.moveTo(20, yMin)
    ctx.lineTo(100, yMin)
    ctx.stroke()

    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(20, yMax)
    ctx.lineTo(100, yMax)
    ctx.stroke()

    // Cursor
    const yVal = h - (valor / 300) * h
    ctx.fillStyle = "#00ffff"
    ctx.fillRect(35, yVal - 3, 50, 6)
  }

  return { dibujar }
}
