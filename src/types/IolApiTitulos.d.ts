declare namespace Titulos {
  interface FCI {
    variacion?: number;
    ultimoOperado?: number;
    horizonteInversion?: string;
    rescate?: "t0" | "t1" | "t2";
    invierte?: string;
    tipoFondo?:
      | "plazo_fijo_pesos"
      | "plazo_fijo_dolares"
      | "renta_fija_pesos"
      | "renta_fija_dolares"
      | "renta_mixta_pesos"
      | "renta_mixta_dolares"
      | "renta_variable_pesos"
      | "renta_variable_dolares";
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
    pais?: "estados_Unidos" | "argentina";
    mercado?: "bCBA" | "nYSE" | "nASDAQ" | "aMEX" | "bCS" | "rOFX";
    tipo?:
      | "oPCIONES"
      | "cEDEARS"
      | "tITULOSPUBLICOS"
      | "aCCIONES"
      | "cUPONESPRIVADOS"
      | "fONDOSDEINVERSION"
      | "aDR"
      | "iNDICES"
      | "bOCON"
      | "bONEX"
      | "cERTIFICADOSPAR"
      | "oBLIGACIONESNEGOCIABLES"
      | "oBLIGACIONESPYME"
      | "cUPONESOBL"
      | "lETRAS"
      | "lETES"
      | "bONOS"
      | "fUTURO"
      | "fondoComundeInversion";
    plazo?: "t0" | "t1" | "t2";
    moneda?:
      | "peso_Argentino"
      | "dolar_Estadounidense"
      | "real"
      | "peso_Mexicano"
      | "peso_Chileno"
      | "yen"
      | "libra"
      | "euro"
      | "peso_Peruano"
      | "peso_Colombiano"
      | "peso_Uruguayo";
  }

  interface Cotizacion {
    ultimoPrecio?: number;
    variacion?: number;
    apertura?: number;
    maximo?: number;
    minimo?: number;
    fechaHora?: string;
    tendencia?: "sube" | "baja" | "mantiene";
    cierreAnterior?: number;
    montoOperado?: number;
    volumenNominal?: number;
    precioPromedio?: number;
    moneda?:
      | "peso_Argentino"
      | "dolar_Estadounidense"
      | "real"
      | "peso_Mexicano"
      | "peso_Chileno"
      | "yen"
      | "libra"
      | "euro"
      | "peso_Peruano"
      | "peso_Colombiano"
      | "peso_Uruguayo";
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
}
