export namespace Cotizaciones {
  interface Puntas {
    cantidadCompra: number;
    precioCompra: number;
    precioVenta: number;
    cantidadVenta: number;
  }
  interface Titulo {
    simbolo: string;
    descripcion: string;
    puntas: Puntas;
    ultimoPrecio: number;
    variacionPorcentual: number;
    apertura: number;
    maximo: number;
    minimo: number;
    ultimoCierre: number;
    volumen: number;
    cantidadOperaciones: number;
    fecha: Date;
    tipoOpcion: string;
    precioEjercicio: number;
    fechaVencimiento: string;
    mercado: string;
    moneda: string;
  }

  interface Cotizacion {
    titulo: Titulo[];
  }
}
