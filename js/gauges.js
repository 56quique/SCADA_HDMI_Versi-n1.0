export function crearGauge(id, min, max) {

  const el = document.getElementById(id);

  if (!el) {
    console.error("Elemento no encontrado:", id);
    return;
  }

  el.innerHTML = "";
  el.className = "gauge";
  // ===== LINEAS DE UMBRAL =====
const minThreshold = 200;
const maxThreshold = 240;

function crearLinea(valor, clase) {
  const linea = document.createElement("div");
  linea.className = clase;
  linea.style.bottom = ((valor - min) / (max - min)) * 100 + "%";
  el.appendChild(linea);
}

crearLinea(minThreshold, "linea-min");
crearLinea(maxThreshold, "linea-max");

  // RELLENO
  const fill = document.createElement("div");
  fill.className = "fill";

  // CURSOR
  const cursor = document.createElement("div");
  cursor.className = "cursor";

  el.appendChild(fill);
  el.appendChild(cursor);

  // ===== ESCALA PRINCIPAL (cada 50V) =====
  for (let i = min; i <= max; i += 50) {
    const tick = document.createElement("div");
    tick.className = "tick";
    tick.style.bottom = ((i - min) / (max - min)) * 100 + "%";

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = i;

    tick.appendChild(label);
    el.appendChild(tick);
  }

  // ===== SUBDIVISIONES (cada 10V) =====
  for (let i = min; i <= max; i += 10) {
    const tick = document.createElement("div");
    tick.className = "tick-small";
    tick.style.bottom = ((i - min) / (max - min)) * 100 + "%";

    el.appendChild(tick);
  }

  let valorActual = 0;

  function animar(valor) {
    valorActual += (valor - valorActual) * 0.1;

    let percent = ((valorActual - min) / (max - min)) * 100;
    percent = Math.max(0, Math.min(100, percent));

    fill.style.height = percent + "%";
    cursor.style.bottom = percent + "%";

    requestAnimationFrame(() => animar(valor));
  }

  return {
    set(valor) {
      animar(valor);
    }
  };
}
