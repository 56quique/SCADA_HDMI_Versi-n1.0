let base = 220

export function simular(estado) {

  // variación lenta general
  base += (Math.random() - 0.5) * 2

  // RED (ligeras diferencias entre fases)
  estado.red.tension = [
    base + (Math.random() - 0.5) * 2,
    base + (Math.random() - 0.5) * 2,
    base + (Math.random() - 0.5) * 2
  ]

  // GRUPO (un poco más inestable)
  estado.grupo.tension = [
    base - 10 + Math.random() * 5,
    base - 10 + Math.random() * 5,
    base - 10 + Math.random() * 5
  ]
}
