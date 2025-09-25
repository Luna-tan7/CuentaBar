// ...existing code...
const Controller = {
  init() {
    const categorias = [...new Set(Model.productos.map(p => p.categoria))];
    View.renderCategorias(categorias);
    categorias.forEach(cat => View.renderProductos(Model.productos, cat));
    if (categorias.length > 0) {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      const first = categorias[0];
      const sec = document.getElementById(first);
      if (sec) sec.classList.add('active');
      const tab = document.querySelector(`.tab[data-section="${first}"]`);
      if (tab) tab.classList.add('active');
    }
    this.bindEvents();
    View.renderTotal(Model.calcularTotal());
    if (typeof window.renderMiniCarrito === 'function') window.renderMiniCarrito();
  },

  bindEvents() {
    // Delegación para evitar rebind al renderizar
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (tab) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        const sec = document.getElementById(tab.dataset.section);
        if (sec) sec.classList.add('active');
        return;
      }

      const img = e.target.closest('.producto-img');
      if (img) {
        const input = document.getElementById(img.dataset.input);
        if (input) {
          const nueva = (parseInt(input.value || "0", 10) || 0) + 1;
          input.value = nueva;
          Model.setCantidad(input.id, nueva);
          actualizarCarritoDesdeInput(input, nueva);
          View.renderTotal(Model.calcularTotal());
          if (typeof window.renderMiniCarrito === 'function') window.renderMiniCarrito();
        } else if (img.dataset.nombre && img.dataset.precio) {
          if (typeof window.agregarProductoAlCarrito === 'function') {
            window.agregarProductoAlCarrito(img.dataset.nombre, parseFloat(img.dataset.precio) || 0, 1);
            View.renderTotal(Model.calcularTotal());
            if (typeof window.renderMiniCarrito === 'function') window.renderMiniCarrito();
          }
        }
        return;
      }

      const btnAdd = e.target.closest('.btn-add');
      if (btnAdd) {
        const nombre = btnAdd.dataset.nombre;
        const precio = parseFloat(btnAdd.dataset.precio) || 0;
        const id = btnAdd.dataset.id;
        const input = id ? document.getElementById(id) : null;
        if (input) {
          const nueva = (parseInt(input.value || "0", 10) || 0) + 1;
          input.value = nueva;
          Model.setCantidad(input.id, nueva);
          actualizarCarritoDesdeInput(input, nueva);
        } else {
          if (typeof window.agregarProductoAlCarrito === 'function') window.agregarProductoAlCarrito(nombre, precio, 1);
          else setCantidadEnCarrito(nombre, precio, (getCantidadEnCarrito(nombre) || 0) + 1);
        }
        View.renderTotal(Model.calcularTotal());
        if (typeof window.renderMiniCarrito === 'function') window.renderMiniCarrito();
        return;
      }
    });

    // inputs cantidad
    document.addEventListener('input', (e) => {
      const input = e.target.closest('.cantidad');
      if (!input) return;
      const cantidad = parseInt(input.value || "0", 10) || 0;
      Model.setCantidad(input.id, cantidad);
      actualizarCarritoDesdeInput(input, cantidad);
      View.renderTotal(Model.calcularTotal());
      if (typeof window.renderMiniCarrito === 'function') window.renderMiniCarrito();
    });

    // borrar pedido
    const btnBorrar = document.getElementById('btn-borrar');
    if (btnBorrar) {
      btnBorrar.addEventListener('click', () => {
        Model.resetPedido();
        document.querySelectorAll('.cantidad').forEach(i => i.value = 0);
        localStorage.removeItem('carrito');
        if (!window.Model) window.Model = {};
        if (!Model.pedido) Model.pedido = {};
        Model.pedido.productos = [];
        window.carrito = [];
        View.renderTotal(Model.calcularTotal());
        if (typeof window.renderMiniCarrito === 'function') window.renderMiniCarrito();
      });
    }
  }
};

/* ---------- helpers de carrito sincronizado ---------- */

function getCantidadEnCarrito(nombre) {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const it = carrito.find(p => String(p.nombre) === String(nombre));
  return it ? Number(it.cantidad || 0) : 0;
}

function setCantidadEnCarrito(nombre, precio, cantidad) {
  let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const idx = carrito.findIndex(p => String(p.nombre) === String(nombre));
  if (cantidad <= 0) {
    if (idx !== -1) carrito.splice(idx,1);
  } else {
    if (idx !== -1) {
      carrito[idx].cantidad = Number(cantidad);
      carrito[idx].precio = Number(precio) || carrito[idx].precio || 0;
    } else {
      carrito.push({ nombre: String(nombre), precio: Number(precio) || 0, cantidad: Number(cantidad) });
    }
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  if (!window.Model) window.Model = {};
  if (!Model.pedido) Model.pedido = {};
  Model.pedido.productos = carrito.slice();
  window.carrito = carrito.slice();
}

function actualizarCarritoDesdeInput(input, cantidad) {
  const nombre = input.dataset.nombre || input.getAttribute('data-nombre') || null;
  const precio = parseFloat(input.dataset.precio || input.getAttribute('data-precio') || "0") || 0;
  if (!nombre) {
    const prod = (Array.isArray(Model.productos) && Model.productos.find(p => String(p.id) === String(input.id)));
    if (prod) {
      setCantidadEnCarrito(prod.nombre, prod.precio, cantidad);
    }
  } else {
    setCantidadEnCarrito(nombre, precio, cantidad);
  }
}

/* ---------- funciones públicas (migradas del HTML) ---------- */

window.obtenerCarritoDesdeFuentes = function() {
  // 1) inputs visibles
  const inputs = document.querySelectorAll('.cantidad');
  const arr = [];
  inputs.forEach(input => {
    const cantidad = Number(input.value) || 0;
    if (cantidad > 0) {
      let nombre = input.dataset.nombre || input.getAttribute('data-nombre') || "";
      let precio = Number(input.dataset.precio || input.getAttribute('data-precio')) || 0;
      if ((!nombre || !precio) && Array.isArray(Model.productos)) {
        const prod = Model.productos.find(p => String(p.id) === String(input.id));
        if (prod) { nombre = nombre || prod.nombre; precio = precio || Number(prod.precio); }
      }
      arr.push({ nombre: String(nombre), precio: Number(precio) || 0, cantidad: Number(cantidad) });
    }
  });
  if (arr.length) return arr;

  // 2) fallback localStorage
  try {
    const fromLS = JSON.parse(localStorage.getItem("carrito") || "[]");
    if (Array.isArray(fromLS) && fromLS.filter(i => Number(i.cantidad) > 0).length) {
      return fromLS.filter(i => Number(i.cantidad) > 0);
    }
  } catch (e) { /* ignore */ }

  // 3) fallback Model.pedido
  if (window.Model && Model.pedido && Array.isArray(Model.pedido.productos)) {
    const mp = Model.pedido.productos.filter(i => Number(i.cantidad) > 0);
    if (mp.length) return mp.slice();
  }

  // 4) fallback window.carrito
  if (Array.isArray(window.carrito) && window.carrito.filter(i => Number(i.cantidad) > 0).length) {
    return window.carrito.filter(i => Number(i.cantidad) > 0).slice();
  }

  return [];
};

window.agregarProductoAlCarrito = function(nombre, precio, cantidad = 1) {
  if (!nombre) return;
  let carrito = [];
  try { carrito = JSON.parse(localStorage.getItem("carrito") || "[]"); } catch (e) { carrito = []; }
  const idx = carrito.findIndex(p => String(p.nombre) === String(nombre));
  if (idx !== -1) carrito[idx].cantidad = Number(carrito[idx].cantidad || 0) + Number(cantidad);
  else carrito.push({ nombre: String(nombre), precio: Number(precio) || 0, cantidad: Number(cantidad) || 1 });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (!window.Model) window.Model = {};
  if (!Model.pedido) Model.pedido = {};
  Model.pedido.productos = carrito.slice();
  window.carrito = carrito.slice();

  window.actualizarTotalCarrito();
  window.renderMiniCarrito && window.renderMiniCarrito();
};

window.validarDestinoPedido = function() {
  if (!window.pedidoTipo) { document.getElementById("modal-advertencia").classList.add("show"); return false; }
  if (window.pedidoTipo === 'delivery') {
    const deliverySel = document.getElementById("delivery-select") ? document.getElementById("delivery-select").value : "";
    if (!deliverySel) { document.getElementById("modal-advertencia").classList.add("show"); return false; }
  }
  if (window.pedidoTipo === 'mesa' && !window.mesaSeleccionada) { document.getElementById("mesa-modal").classList.add("show"); return false; }
  return true;
};

window.abrirRevisionPedido = function() {
  const productos = window.obtenerCarritoDesdeFuentes();
  if (!productos.length) { alert("No hay productos seleccionados."); return; }
  if (!window.validarDestinoPedido()) return;

  const detalle = document.getElementById("pedido-detalle");
  const total = productos.reduce((a,b) => a + (Number(b.precio)||0) * (Number(b.cantidad)||0), 0);
  let html = "<ul style='text-align:left;margin:0;padding-left:18px;'>";
  productos.forEach(p => html += `<li>${p.cantidad} x ${p.nombre} ($${Number(p.precio).toFixed(2)})</li>`);
  html += `</ul><p style='margin-top:8px;'><strong>Total: $${total.toFixed(2)}</strong></p>`;
  if (detalle) detalle.innerHTML = html;

  try { localStorage.setItem("carrito", JSON.stringify(productos)); } catch (e) {}
  if (!window.Model) window.Model = {};
  if (!Model.pedido) Model.pedido = {};
  Model.pedido.productos = productos.slice();
  window.carrito = productos.slice();

  document.getElementById("modal-revision-pedido").classList.add("show");
};

window.confirmarPedidoGuardar = function() {
  const productos = JSON.parse(localStorage.getItem("carrito") || "[]");
  if (!productos.length) { alert("No hay productos para confirmar."); document.getElementById("modal-revision-pedido").classList.remove("show"); return; }

  const tipo = window.pedidoTipo || "";
  const mesa = tipo === "mesa" ? window.mesaSeleccionada : "";
  const delivery = tipo === "delivery" ? (document.getElementById("delivery-select") ? document.getElementById("delivery-select").value : "") : "";

  const total = productos.reduce((acc, prod) => acc + (Number(prod.precio)||0) * (Number(prod.cantidad)||0), 0);

  const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  const numeroPedido = pedidos.length ? (pedidos[pedidos.length - 1].numeroPedido + 1) : 1;
  const fechaObj = new Date();
  const fecha = fechaObj.getDate().toString().padStart(2, "0") + "/" + (fechaObj.getMonth()+1).toString().padStart(2,"0") + "/" + fechaObj.getFullYear();
  const hora = fechaObj.getHours().toString().padStart(2,"0") + ":" + fechaObj.getMinutes().toString().padStart(2,"0");

  const nuevoPedido = { numeroPedido, fecha, hora, tipo, mesa, delivery, productos, total };
  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  // limpiar carrito y actualizar UI
  localStorage.removeItem("carrito");
  if (window.Model && Model.pedido) Model.pedido.productos = [];
  window.carrito = [];
  window.actualizarTotalCarrito();
  window.renderMiniCarrito && window.renderMiniCarrito();

  document.getElementById("modal-revision-pedido").classList.remove("show");
  document.getElementById("modal-confirmacion-pedido").classList.add("show");

  if (typeof mostrarPedidosAdmin === "function") mostrarPedidosAdmin();
  if (typeof mostrarGraficoVentas === "function") mostrarGraficoVentas();
};

/* ---------- inicialización ---------- */
document.addEventListener('DOMContentLoaded', () => Controller.init());
// ...existing code...