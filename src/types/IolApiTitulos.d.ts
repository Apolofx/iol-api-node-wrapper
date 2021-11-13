import { Plazo, Fondo, Pais, Mercado, Instrumento, Moneda, Tendencia } from ".";
export namespace Titulos {
  interface FCI {
    variacion?: number;
    ultimoOperado?: number;
    horizonteInversion?: string;
    rescate?: Plazo;
    invierte?: string;
    tipoFondo?: Fondo;
    avisoHorarioEjecucion?: string;
    tipoAdministradoraTituloFCI?:
      | "cONVEXITY"
      | "sUPERVIELLE"
      | "aLLARIA"
      | "aLLIANCE_BERNSTEIN";
    fechaCorte?: string;
    codigoBloomberg?: string;
    perfilInversor?: string;
    informeMensual?: string;
    reglamentoGestion?: string;
    variacionMensual?: number;
    variacionAnual?: number;
    simbolo?: string;
    descripcion?: string;
    pais?: Pais;
    mercado?: Mercado;
    tipo?: Instrumento;
    plazo?: Plazo;
    moneda?: Moneda;
  }

  interface Cotizacion {
    ultimoPrecio?: number;
    variacion?: number;
    apertura?: number;
    maximo?: number;
    minimo?: number;
    fechaHora?: string;
    tendencia?: Tendencia;
    cierreAnterior?: number;
    montoOperado?: number;
    volumenNominal?: number;
    precioPromedio?: number;
    moneda?: Moneda;
    precioAjuste?: number;
    interesesAbiertos?: number;
    puntas?: Puntas[];
    cantidadOperaciones?: number;
  }
  interface Puntas {
    cantidadCompra?: number;
    precioCompra?: number;
    precioVenta?: number;
    cantidadVenta?: number;
  }
  interface Opciones {
    simboloSubyacente?: string;
    fechaVencimiento?: Date;
    tipoOpcion?: string;
    simbolo?: string;
    descripcion?: string;
    pais?: Pais;
    mercado?: Mercado;
    tipo?: Instrumento;
    plazo?: Plazo;
    moneda?: Moneda;
  }
}
