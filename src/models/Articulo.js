import { Medida } from "./Medida.js";
//import { ProductoArticulo } from "./ProductoArticulo.js";

export class Articulo {
  constructor(data = {}) {
    this.id = data?.id ?? 0;
    this.codigo = data?.codigo ?? "";
    this.nombre = data?.nombre ?? "";
    this.descripcion = data?.descripcion ?? "";
    this.stock = Number(data?.stock ?? 0);

    this.medida = new Medida(data?.medida ?? {});

    this.createdAt = data?.createdAt ?? null;
    this.updatedAt = data?.updatedAt ?? null;

    this.productoarticulo = null // data?.productoarticulo
      //? new ProductoArticulo(data.productoarticulo)
      //: null;
  }

  tieneStock() {
    return this.stock > 0;
  }

  estaAgotado() {
    return this.stock <= 0;
  }

  descripcionCompleta() {
    return `${this.codigo} - ${this.nombre}`;
  }

  stockConMedida() {
    const medida = this.medida?.abreviatura || this.medida?.nombre || "";
    return `${this.stock} ${medida}`.trim();
  }

  aumentarStock(cantidad) {
    const valor = Number(cantidad);

    if (Number.isNaN(valor) || valor <= 0) {
      throw new Error("La cantidad debe ser un número mayor que cero.");
    }

    this.stock += valor;

    return this.stock;
  }

  disminuirStock(cantidad) {
    const valor = Number(cantidad);

    if (Number.isNaN(valor) || valor <= 0) {
      throw new Error("La cantidad debe ser un número mayor que cero.");
    }

    if (valor > this.stock) {
      throw new Error("La cantidad solicitada supera el stock disponible.");
    }

    this.stock -= valor;

    return this.stock;
  }
}