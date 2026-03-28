let base = 220

export function simular(estado) {

  base += (Math.random() - 0.5) * 2

  // TENSIONES
  estado.red.tension = [
    base + (Math.random() - 0.5) * 2,
    base + (Math.random() - 0.5) * 2,
    base + (Math.random() - 0.5) * 2
  ]

  estado.grupo.tension = [
    base - 10 + Math.random() * 5,
    base - 10 + Math.random() * 5,
    base - 10 + Math.random() * 5
  ]

  // CORRIENTES (simulación simple)
  estado.red.corriente = [
  40 + Math.random() * 60,
  40 + Math.random() * 60,
  40 + Math.random() * 60
]

estado.grupo.corriente = [
  50 + Math.random() * 70,
  50 + Math.random() * 70,
  50 + Math.random() * 70
]
}
