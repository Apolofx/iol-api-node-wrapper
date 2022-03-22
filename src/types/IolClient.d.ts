import { Cuenta } from "./IolApiCuenta";
import { Titulos } from "./IolApiTitulos";
import { Operar } from "./IolApiOperar";
import { Cotizaciones } from "./IolApiCotizaciones";
import { Paneles } from "./IolApiPaneles";
export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  ".issued": string;
  ".expires": string;
  ".refreshexpires": string;
}

export interface IolAuthData {
  url: string;
  password: string;
  username: string;
}

export interface OperacionesFiltro {
  numero: number;
  estado: "todas" | "pendientes" | "terminadas" | "canceladas";
  fechaDesde: string | Date;
  fechaHasta: string | Date;
  pais: Pais;
}

export interface GenericResponse {
  ok?: boolean;
  messages?: Message[];
}
export interface Message {
  title?: string;
  description?: string;
}

export interface IolClientInterface {
  getAccountStatus(): Promise<Cuenta.EstadoDeCuenta>;
  getPortfolio(country: Pais): Promise<Cuenta.Portafolio>;
  getOperations(filter: OperacionesFiltro): Promise<Cuenta.Operaciones>;
  getOperation(operationNumber: number): Promise<Cuenta.OperacionDetalle>;
  buy(body: Operar.Comprar): Promise<GenericResponse>;
  sell(body: Operar.Vender): Promise<GenericResponse>;
  fciRescue(body: Operar.RescateFCI): Promise<GenericResponse>;
  fciSubscription(body: Operar.SuscripcionFCI): Promise<GenericResponse>;
  getAllFCI(): Promise<Titulos.FCI[]>;
  getFCI(symbol: string): Promise<Titulos.FCI>;
  getPrice(market: Mercado, symbol: string): Promise<Titulos.Cotizacion>;
  getOptions(market: Mercado, symbol: string): Promise<Titulos.Opcion[]>;
  getQuotes(
    instrument: Instrumento,
    panel: Paneles.Todos,
    country: Pais
  ): Promise<Cotizaciones.Cotizacion[]>;
}

export type Pais = "estados_Unidos" | "argentina";
export type Tendencia = "sube" | "baja" | "mantiene";
export type Moneda =
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
export type Plazo = "t0" | "t1" | "t2";
export type Instrumento =
  | "opciones"
  | "cedears"
  | "titulospublicos"
  | "acciones"
  | "cuponesprivados"
  | "fondosdeinversion"
  | "adr"
  | "indices"
  | "bocon"
  | "bonex"
  | "certificadospar"
  | "obligacionesnegociables"
  | "obligacionespyme"
  | "cuponesobl"
  | "letras"
  | "letes"
  | "bonos"
  | "futuro"
  | "fondocomundeinversion";
export type Mercado = "BCBA" | "NYSE" | "NASDAQ" | "AMEX" | "BCS" | "ROFX";
export type TipoOrden = "precioLimite" | "precioMercado";
export type Fondo =
  | "plazo_fijo_pesos"
  | "plazo_fijo_dolares"
  | "renta_fija_pesos"
  | "renta_fija_dolares"
  | "renta_mixta_pesos"
  | "renta_mixta_dolares"
  | "renta_variable_pesos"
  | "renta_variable_dolares";
