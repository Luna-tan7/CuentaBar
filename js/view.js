// ...existing code...
// Asegura que no se redeclare View si ya existe en otra parte
window.View = window.View || {};

(function (View) {
  View.renderCategorias = function(categorias) {
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    tabs.innerHTML = categorias.map(cat => {
      let icon = "";
      let nombre = cat.charAt(0).toUpperCase() + cat.slice(1);
      switch (cat) {
        case "especiales": icon = "⭐ "; break;
        case "cafe": icon = "☕ "; break;
        case "postres": icon = "🍰 "; break;
        case "helados": icon = "🍦 "; break;
        case "licuados": icon = "🥤 "; break;
        case "sorbete":
          icon = "🌶️ ";
          nombre = "Enchilados";
          break;
        case "sundaes": icon = "🍨 "; break;
        case "litros": icon = "🥶 "; break;
        case "varios": icon = "🍡 "; break;
        default: icon = "";
      }
      return `<div class="tab" data-section="${cat}">${icon}${nombre}</div>`;
    }).join('');
  };

  View.renderProductos = function(productos, categoria) {
    const section = document.getElementById(categoria);
    if (!section) return;
    section.innerHTML = productos
      .filter(p => p.categoria === categoria)
      .map(p => `
        <div class="producto-card">
          <img src="${p.imagen || ''}" alt="${p.nombre}" class="producto-img" data-input="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}">
          <div class="producto-nombre">${p.nombre}<br>$${Number(p.precio).toFixed(2)}</div>
          <div style="display:flex;gap:8px;align-items:center;">
            <input type="number" min="0" value="${Model.getCantidad(p.id) || 0}" data-precio="${p.precio}" data-nombre="${p.nombre}" id="${p.id}" class="cantidad" style="width:70px;">
          </div>
        </div>
      `).join('');
  };

  View.renderTotal = function(total) {
    const totalEl = document.getElementById('total');
    if (totalEl) totalEl.textContent = Number(total || 0).toFixed(2);
  };

  View.renderMiniCarrito = function() {
    const footerActions = document.querySelector(".footer-actions");
    if (!footerActions) return;
    let mini = document.getElementById("mini-carrito");
    if (!mini) {
      mini = document.createElement("div");
      mini.id = "mini-carrito";
      mini.style.fontSize = "13px";
      mini.style.marginTop = "8px";
      mini.style.textAlign = "left";
      footerActions.appendChild(mini);
    }
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    if (!carrito.length) { mini.innerHTML = "<em>No hay productos seleccionados</em>"; return; }
    mini.innerHTML = "<strong>Seleccionados:</strong><ul style='margin:4px 0 0 16px;padding:0;'>" +
      carrito.map(p => `<li>${p.cantidad} x ${p.nombre} ($${Number(p.precio).toFixed(2)})</li>`).join("") +
      "</ul>";
  };
})(window.View);

// ...existing code...
