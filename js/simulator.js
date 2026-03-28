// Valor base global (se mantiene entre llamadas)
let valorBase = 220

export function simular(estado) {

  // Variación lenta tipo red real (no salta bruscamente)
  valorBase += (Math.random() - 0.5) * 2

  // RED (más estable)
  estado.red.tension = estado.red.tension.map(() => valorBase)

  // GRUPO (ligeramente distinto)
  estado.grupo.tension = estado.grupo.tension.map(() =>
    valorBase - 10 + Math.random() * 5
  )

}
