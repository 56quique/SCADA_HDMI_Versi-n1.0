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
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
  ]

  estado.grupo.corriente = [
    Math.random() * 120,
    Math.random() * 120,
    Math.random() * 120
  ]
}
