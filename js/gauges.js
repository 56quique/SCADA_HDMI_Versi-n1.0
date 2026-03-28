// Función que crea un gauge vertical
export function crearGauge(id, min, max) {

  // Busca el canvas en el HTML
  const canvas = document.getElementById(id)

  // Si no existe, evita que todo el sistema falle
  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return { dibujar: () => {} }
  }

  // Contexto de dibujo 2D
  const ctx = canvas.getContext("2d")

  // Tamaño REAL interno (muy importante)
  canvas.width = 120
  canvas.height = 300

  // Función que dibuja el valor
  function dibujar(valor) {

    // Limpia el canvas en cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Fondo del instrumento
    ctx.fillStyle = "#222"
    ctx.fillRect(40, 20, 40, 260)

    // Conversión valor → altura gráfica
    const altura = ((valor - min) / (max - min)) * 260

    // Color según rango (lógica eléctrica)
    let color = "red"
    if (valor >= 210 && valor <= 240) color = "lime"

    // Barra del gauge
    ctx.fillStyle = color
    ctx.fillRect(40, 280 - altura, 40, altura)

    // Texto del valor
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.fillText(valor.toFixed(1) + " V", 25, 15)
  }

  // Devuelve el método para usar desde afuera
  return { dibujar }
}
