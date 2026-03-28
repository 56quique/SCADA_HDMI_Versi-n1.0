// Este objeto representa TODO el sistema eléctrico
// Es la base del SCADA

export const estado = {

  // Datos de la RED
  red: {
    tension: [220, 220, 220],   // L1, L2, L3
    corriente: [0, 0, 0],       // L1, L2, L3
    frecuencia: 50,
    potencia: {
      p: 0,     // activa
      q: 0,     // reactiva
      s: 0,     // aparente
      cosfi: 1
    }
  },

  // Datos del GRUPO ELECTRÓGENO
  grupo: {
    tension: [0, 0, 0],
    corriente: [0, 0, 0],
    frecuencia: 50,
    potencia: {
      p: 0,
      q: 0,
      s: 0,
      cosfi: 1
    }
  }

}
