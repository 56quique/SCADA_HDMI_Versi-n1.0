export function crearGauge(id, min, max) {

  const el = document.getElementById(id);

  if (!el) {
    console.error("Elemento no encontrado:", id);
    return;
  }

  el.innerHTML = "";
  el.className = "gauge";

  // ===== CURSOR =====
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  el.appendChild(cursor);

  // ===== LINEAS =====
  const lineaMin = document.createElement("div");
  lineaMin.className = "linea-min";
  el.appendChild(lineaMin);

  const lineaMax = document.createElement("div");
  lineaMax.className = "linea-max";
  el.appendChild(lineaMax);

  // ===== ESCALA =====
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

  for (let i = min; i <= max; i += 10) {
    const tick = document.createElement("div");
    tick.className = "tick-small";
    tick.style.bottom = ((i - min) / (max - min)) * 100 + "%";
    el.appendChild(tick);
  }

  // ===== VALOR SUAVE =====
  let valorActual = 0;

  function set(valor) {
    valorActual += (valor - valorActual) * 0.2;

    let percent = ((valorActual - min) / (max - min)) * 100;
    percent = Math.max(0, Math.min(100, percent));

    cursor.style.bottom = percent + "%";
  }

  // ===== UMBRALES DINÁMICOS =====
  function setThresholds(minVal, maxVal) {
    const pMin = ((minVal - min) / (max - min)) * 100;
    const pMax = ((maxVal - min) / (max - min)) * 100;

    lineaMin.style.bottom = pMin + "%";
    lineaMax.style.bottom = pMax + "%";
  }

  return {
    set,
    setThresholds
  };
}export function crearGauge(id, min, max) {

  const el = document.getElementById(id);

  if (!el) {
    console.error("Elemento no encontrado:", id);
    return;
  }

  el.innerHTML = "";
  el.className = "gauge";

  // ===== CURSOR =====
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  el.appendChild(cursor);

  // ===== LINEAS =====
  const lineaMin = document.createElement("div");
  lineaMin.className = "linea-min";
  el.appendChild(lineaMin);

  const lineaMax = document.createElement("div");
  lineaMax.className = "linea-max";
  el.appendChild(lineaMax);

  // ===== ESCALA =====
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

  for (let i = min; i <= max; i += 10) {
    const tick = document.createElement("div");
    tick.className = "tick-small";
    tick.style.bottom = ((i - min) / (max - min)) * 100 + "%";
    el.appendChild(tick);
  }

  // ===== VALOR =====
  let valorActual = 0;

  function set(valor) {
    valorActual += (valor - valorActual) * 0.2;

    let percent = ((valorActual - min) / (max - min)) * 100;
    percent = Math.max(0, Math.min(100, percent));

    cursor.style.bottom = percent + "%";
  }

  // ===== UMBRALES =====
  function setThresholds(minVal, maxVal) {
    const pMin = ((minVal - min) / (max - min)) * 100;
    const pMax = ((maxVal - min) / (max - min)) * 100;

    lineaMin.style.bottom = pMin + "%";
    lineaMax.style.bottom = pMax + "%";
  }

  return {
    set,
    setThresholds
  };
}
