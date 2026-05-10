// ===== CANVAS =====

const canvas =
  document.getElementById("canvas");

// ===== CONTADOR =====

let nodeCounter = 0;

// ===== SIDEBAR =====

const symbols =
  document.querySelectorAll(".symbol");

// ===== DRAG SIDEBAR =====

symbols.forEach(symbol => {

  symbol.addEventListener(
    "dragstart",
    e => {

      e.dataTransfer.setData(
        "type",
        symbol.dataset.type
      );

    }
  );

});

// ===== HABILITAR DROP =====

canvas.addEventListener(
  "dragover",
  e => {

    e.preventDefault();

  }
);

// ===== DROP =====

canvas.addEventListener(
  "drop",
  e => {

    e.preventDefault();

    // ===== TIPO =====

    const type =
      e.dataTransfer.getData("type");

    // ===== POSICION =====

    const rect =
      canvas.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    // ===== CREAR NODO =====

    createNode(type, x, y);

  }
);

// ===== CREAR NODO =====

function createNode(type, x, y){

  const node =
    document.createElement("div");

  node.classList.add("node");

  node.dataset.id =
    "node_" + nodeCounter++;

  node.style.left = x + "px";
  node.style.top = y + "px";

  // ===== SVG =====

  node.innerHTML =
    getSVG(type);

  // ===== AGREGAR =====

  canvas.appendChild(node);

  // ===== MOVER =====

  enableMove(node);

}

// ===== SVG =====

function getSVG(type){

  // ===== TP =====

  if(type === "TP"){

    return `

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="60"
      viewBox="0 0 140 60"
    >

      <rect
        x="10"
        y="10"
        width="100"
        height="40"
        fill="white"
        stroke="black"
        stroke-width="2"
      />

      <line
        x1="10"
        y1="10"
        x2="110"
        y2="50"
        stroke="black"
        stroke-width="2"
      />

      <line
        x1="110"
        y1="10"
        x2="10"
        y2="50"
        stroke="black"
        stroke-width="2"
      />

      <text
        x="118"
        y="35"
        font-size="14"
        font-family="Arial"
      >
        TP
      </text>

    </svg>

    `;
  }

  // ===== TS =====

  if(type === "TS"){

    return `

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="60"
      viewBox="0 0 140 60"
    >

      <rect
        x="10"
        y="10"
        width="100"
        height="40"
        fill="white"
        stroke="black"
        stroke-width="2"
      />

      <line
        x1="20"
        y1="20"
        x2="100"
        y2="40"
        stroke="black"
        stroke-width="2"
      />

      <text
        x="118"
        y="35"
        font-size="14"
        font-family="Arial"
      >
        TS
      </text>

    </svg>

    `;
  }

  return "";

}

// ===== MOVER NODOS =====

function enableMove(node){

  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;

  node.addEventListener(
    "mousedown",
    e => {

      isDragging = true;

      offsetX =
        e.clientX - node.offsetLeft;

      offsetY =
        e.clientY - node.offsetTop;

    }
  );

  document.addEventListener(
    "mousemove",
    e => {

      if(!isDragging) return;

      node.style.left =
        (e.clientX - offsetX) + "px";

      node.style.top =
        (e.clientY - offsetY) + "px";

    }
  );

  document.addEventListener(
    "mouseup",
    () => {

      isDragging = false;

    }
  );

}
