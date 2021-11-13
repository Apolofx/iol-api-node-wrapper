import { Mercado, TipoOrden, Plazo } from ".";

export namespace Operar {
  interface Vender {
    mercado: Mercado;
    simbolo: string;
    cantidad: number;
    precio: number;
    validez: Date;
    tipoOrden?: TipoOrden;
    plazo?: Plazo;
  }

  interface Comprar {
    mercado: Mercado;
    simbolo: string;
    cantidad?: number;
    precio: number;
    plazo: Plazo;
    validez: Date;
    tipoOrden?: TipoOrden;
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
