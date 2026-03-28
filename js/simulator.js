// Esta función modifica el estado simulando mediciones reales

export function simular(estado) {

  // Genera tensiones de red entre 210 y 240 aprox
  estado.red.tension = estado.red.tension.map(() =>
    210 + Math.random() * 30
  )

  // Genera tensiones del grupo entre 200 y 240 aprox
  estado.grupo.tension = estado.grupo.tension.map(() =>
    200 + Math.random() * 40
  )

}
