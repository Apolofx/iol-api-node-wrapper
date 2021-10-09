export namespace Operar {
  type Mercado = "bCBA" | "nYSE" | "nASDAQ" | "aMEX" | "bCS" | "rOFX";
  interface Vender {
    mercado: Mercado;
    simbolo: string;
    cantidad: number;
    precio: number;
    validez: string;
    tipoOrden?: "precioLimite" | "precioMercado";
    plazo?: "t0" | "t1" | "t2";
  }

  interface Comprar {
    mercado: Mercado;
    simbolo: string;
    cantidad?: number;
    precio: number;
    plazo: "t0" | "t1" | "t2";
    validez: Date;
    tipoOrden?: "precioLimite" | "precioMercado";
    monto?: number;
  }

  interface RescateFCI {
    simbolo?: string;
    cantidad?: number;
    soloValidar?: boolean;
  }

  interface SuscripcionFCI {
    simbolo?: string;
    monto?: number;
    soloValidar?: boolean;
  }
}
