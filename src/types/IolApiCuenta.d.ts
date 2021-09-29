declare namespace Cuenta {
  interface Saldo {
    liquidacion: string;
    saldo: number;
    comprometido: number;
    disponible: number;
    disponibleOperar: number;
  }

  interface Cuenta {
    numero: string;
    tipo: string;
    moneda: string;
    disponible: number;
    comprometido: number;
    saldo: number;
    titulosValorizados: number;
    total: number;
    margenDescubierto: number;
    saldos: Saldo[];
    estado: string;
  }

  interface Estadistica {
    descripcion: string;
    cantidad: number;
    volumen: number;
  }

  interface EstadoDeCuenta {
    cuentas: Cuenta[];
    estadisticas: Estadistica[];
    totalEnPesos: number;
  }

  interface Titulo {
    simbolo: string;
    descripcion: string;
    pais: string;
    mercado: string;
    tipo: string;
    plazo: string;
    moneda: string;
  }

  interface Parking {
    disponibleInmediato: number;
  }

  interface Activo {
    cantidad: number;
    comprometido: number;
    puntosVariacion: number;
    variacionDiaria: number;
    ultimoPrecio: number;
    ppc: number;
    gananciaPorcentaje: number;
    gananciaDinero: number;
    valorizado: number;
    titulo: Titulo;
    parking: Parking;
  }

  interface Portafolio {
    pais: string;
    activos: Activo[];
  }

  export interface EstadoOperacion {
    detalle: string;
    fecha: Date;
  }

  export interface Arancel {
    tipo: string;
    neto: number;
    iva: number;
    moneda: string;
  }

  export interface Operacion {
    fecha: Date;
    cantidad: number;
    precio: number;
  }

  export interface OperacionDetalle {
    numero: number;
    mercado: string;
    simbolo: string;
    moneda: string;
    tipo: string;
    fechaAlta: Date;
    validez: Date;
    fechaOperado: Date;
    estadoActual: string;
    estados: EstadoOperacion[];
    aranceles: Arancel[];
    operaciones: Operacion[];
    precio: number;
    cantidad: number;
    monto: number;
    fondosParaOperacion: number;
    montoOperacion: number;
    modalidad: string;
    arancelesARS: number;
    arancelesUSD: number;
  }

  interface OperacionInline {
    numero: number;
    fechaOrden: Date;
    tipo: string;
    estado: string;
    mercado: string;
    simbolo: string;
    cantidad: number;
    monto: number;
    modalidad: string;
    precio: number;
    fechaOperada: Date;
    cantidadOperada: number;
    precioOperado: number;
    montoOperado: number;
  }

  type Operaciones = OperacionInline[];
}
