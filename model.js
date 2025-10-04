const Model = {
  productos: [
    // ⭐ Especiales
    { id: "mangoneada_sencilla", nombre: "Mangoneada sencilla", precio: 2.50, categoria: "especiales", imagen: "img/mangoneada_sencilla.jpg" },
    { id: "mangoneada_xl", nombre: "Mangoneada XL", precio: 4.00, categoria: "especiales", imagen: "img/mangoneada_xl.jpg" },
    { id: "boquita_mangoneada", nombre: "Boquita mangoneada", precio: 2.75, categoria: "especiales", imagen: "img/boquita_mangoneada.jpg" },
    { id: "frozen_mangoneada", nombre: "Frozen", precio: 3.00, categoria: "especiales", imagen: "img/frozen_mangoneada.jpg" },
    { id: "sorbete_michelada", nombre: "Michelada", precio: 2.00, categoria: "especiales", imagen: "img/sorbete_michelada.jpg" },
    { id: "sorbete_michelada_xl", nombre: "Michelada XL", precio: 3.75, categoria: "especiales", imagen: "img/sorbete_michelada_xl.jpg" },
    { id: "michelada_snack", nombre: "Michelada snack", precio: 2.75, categoria: "especiales", imagen: "img/michelada_snack.jpg" },
    { id: "nieve_chamoyada", nombre: "Chamoyadas", precio: 2.75, categoria: "especiales", imagen: "img/nieve_chamoyada.jpg" },
    { id: "nieve_chamoyada_xl", nombre: "Chamoyadas XL", precio: 5.00, categoria: "especiales", imagen: "img/nieve_chamoyada_xl.jpg" },
    { id: "cocada", nombre: "Cocada", precio: 3.00, categoria: "especiales", imagen: "img/cocada.jpg" },
    { id: "boquita_preparada", nombre: "Boquita preparada", precio: 1.75, categoria: "especiales", imagen: "img/boquita_preparada.jpg" },
    { id: "frozen_chamoyada", nombre: "Frozen Chamoyada", precio: 3.00, categoria: "especiales", imagen: "img/chamoyada.jpg" },
   
    // ☕ Café
    { id: "iced_caramel_machiato", nombre: "Iced Caramel Machiato", precio: 2.75, categoria: "cafe", imagen: "img/cafe.jpg" },
    { id: "americano", nombre: "Americano", precio: 1.25, categoria: "cafe", imagen: "img/cafe.jpg" },
    { id: "capuccino", nombre: "Capuccino", precio: 2.00, categoria: "cafe", imagen: "img/cafe.jpg" },
    { id: "capuccino_saborizado", nombre: "Capuccino saborizado", precio: 2.50, categoria: "cafe", imagen: "img/cafe.jpg" },
    { id: "espresso", nombre: "Espresso", precio: 1.50, categoria: "cafe", imagen: "img/cafe.jpg" },
    { id: "afogato", nombre: "Afogato", precio: 2.50, categoria: "cafe", imagen: "img/cafe.jpg" },
    { id: "te_chai", nombre: "Té de chai", precio: 2.00, categoria: "cafe", imagen: "img/chai.jpg" },
    { id: "te_manzanilla", nombre: "Té de manzanilla", precio: 0.75, categoria: "cafe", imagen: "img/te.jpg" },
    { id: "chocolate_caliente", nombre: "Chocolate caliente con leche", precio: 1.00, categoria: "cafe", imagen: "img/chocolate.jpg" },

    // 🍰 Postres
    { id: "fresas_crema_sencillo", nombre: "Fresas con crema sencillo", precio: 2.75, categoria: "postres", imagen: "img/fresas_crema_sencillo.jpg" },
    { id: "fresas_melocoton_sencillo", nombre: "Fresas y melocotón con crema sencillos", precio: 2.75, categoria: "postres", imagen: "img/fresas_melocoton_sencillo.jpg" },
    { id: "banano_crema_xl", nombre: "Banano con crema XL", precio: 3.50, categoria: "postres", imagen: "img/banano_crema_xl.jpg" },
    { id: "cheesecake_porcion", nombre: "Cheesecake (Porción)", precio: 3.00, categoria: "postres", imagen: "img/cheesecake_porcion.jpg" },
    { id: "cheesecake_completo", nombre: "Cheesecake (Completo)", precio: 16.00, categoria: "postres", imagen: "img/cheesecake_completo.jpg" },
    { id: "fresas_crema_xl", nombre: "Fresas con crema XL", precio: 3.50, categoria: "postres", imagen: "img/fresas_crema_xl.jpg" },
    { id: "fresas_melocoton_xl", nombre: "Fresas y melocotón con crema XL", precio: 3.50, categoria: "postres", imagen: "img/fresas_melocoton_xl.jpg" },
    { id: "quesadilla_porcion", nombre: "Quesadilla (Porción)", precio: 1.25, categoria: "postres", imagen: "img/quesadilla_porcion.jpg" },
    { id: "fresas_cheesecake", nombre: "Fresas con crema y cheesecake", precio: 4.25, categoria: "postres", imagen: "img/fresas_cheesecake.jpg" },
    { id: "fresas_melocoton_cheesecake", nombre: "Fresas y melocotón con crema y cheesecake", precio: 6.00, categoria: "postres", imagen: "img/fresas_melocoton_cheesecake.jpg" },

    // 🍦 Helados
     { id: "barquillo_pequeño", nombre: "Barquillo 1 Bola", precio: 0.75, categoria: "helados", imagen: "img/barquillo.jpg" },
    { id: "barquillo_mediano", nombre: "Barquillo 2 Bolas", precio: 1.00, categoria: "helados", imagen: "img/barquillo.jpg" },
     { id: "barquillo_grande", nombre: "Barquillo 3 Bolas", precio: 1.50, categoria: "helados", imagen: "img/barquillo.jpg" },
    { id: "vaso_sencillo", nombre: "Vaso sencillo", precio: 1.25, categoria: "helados", imagen: "img/vaso_sencillo.jpg" },
    { id: "vaso_xl", nombre: "Vaso XL", precio: 2.50, categoria: "helados", imagen: "img/vaso_XL.jpg" },

    // 🥤 Licuados, Frozen & Frappes
    { id: "fresa_leche", nombre: "Licuados", precio: 1.50, categoria: "licuados", imagen: "img/licuados.jpg" },
    { id: "oreo_banano_leche", nombre: "Licuados con 2 frutas", precio: 1.75, categoria: "licuados", imagen: "img/licuados.jpg" },
    { id: "frozen_fresa", nombre: "Frozen", precio: 2.50, categoria: "licuados", imagen: "img/frozen.jpg" },
    { id: "frappe_mocca", nombre: "Frappes ", precio: 3.00, categoria: "licuados", imagen: "img/frappe.jpg" },
    
    // 🌶️ Sorbete Enchilado
    { id: "sorbete_sencillo", nombre: "Sencillo", precio: 2.00, categoria: "sorbete", imagen: "img/enchilados.jpg" },
    { id: "sorbete_xl", nombre: "XL", precio: 3.50, categoria: "sorbete", imagen: "img/enchilados_xl.jpg" },
    { id: "sorbete_xxl", nombre: "XXL", precio: 4.75, categoria: "sorbete", imagen: "img/enchilados_xll.jpg" },

    // 🍨 Sundaes
    { id: "sundae_tutti", nombre: "Sundae Tutti Frutti", precio: 2.75, categoria: "sundaes", imagen: "img/sundae_tutti_frutti.jpg" },
    { id: "banana_split", nombre: "Banana Split", precio: 2.50, categoria: "sundaes", imagen: "img/banana_split.jpg" },
    { id: "mini_sundae", nombre: "Mini Sundae", precio: 1.75, categoria: "sundaes", imagen: "img/mini_sundae.jpg" },
    { id: "sundae_clasico", nombre: "Sundae Clásico", precio: 2.50, categoria: "sundaes", imagen: "img/sundae_clasico.jpg" },

    // 🥶 Para compartir
    { id: "litro_1", nombre: "1 Litro", precio: 5.00, categoria: "litros", imagen: "img/1_litro.jpg" },
    { id: "medio_galon", nombre: "½ Galón", precio: 9.00, categoria: "litros", imagen: "img/medio_galon.jpg" },

    // 🍡 Varios
    { id: "palomitas", nombre: "Palomitas", precio: 1.25, categoria: "varios", imagen: "img/palomitas.jpg" },
    { id: "soda_lata", nombre: "Sodas en lata", precio: 1.00, categoria: "varios", imagen: "img/soda_lata.jpg" },
    { id: "agua_botella", nombre: "Agua en botella", precio: 0.75, categoria: "varios", imagen: "img/agua_botella.jpg" }
  ],
  pedido: {},
  setCantidad(id, cantidad) {
    this.pedido[id] = cantidad;
  },
  getCantidad(id) {
    return this.pedido[id] || 0;
  },
  resetPedido() {
    this.pedido = {};
  },
  calcularTotal() {
    return Object.entries(this.pedido).reduce((total, [id, cantidad]) => {
      const producto = this.productos.find(p => p.id === id);
      return total + (producto ? producto.precio * cantidad : 0);
    }, 0);
  }
};
