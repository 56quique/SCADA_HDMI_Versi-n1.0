export function crearGauge(id, min, max) {

  const el = document.getElementById(id);

  if (!el) {
    console.error("Elemento no encontrado:", id);
    return;
  }

  el.classList.add("gauge");

  // barra de relleno
  const fill = document.createElement("div");
  fill.className = "fill";

  // cursor indicador
  const cursor = document.createElement("div");
  cursor.className = "cursor";

  el.appendChild(fill);
  el.appendChild(cursor);

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
