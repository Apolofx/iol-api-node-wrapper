import { Cuenta } from "./IolApiCuenta";
import { Titulos } from "./IolApiTitulos";
import { Operar } from "./IolApiOperar";

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

export type Mercado = "bCBA" | "nYSE" | "nASDAQ" | "aMEX" | "bCS" | "rOFX";
export type Country = "argentina" | "estados_Unidos";
export interface OperationsFilter {
  numero: number;
  estado: "todas" | "pendientes" | "terminadas" | "canceladas";
  fechaDesde: string | Date;
  fechaHasta: string | Date;
  pais: Country;
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
  getPortfolio(country: Country): Promise<Cuenta.Portafolio>;
  getOperations(filter: OperationsFilter): Promise<Cuenta.Operaciones>;
  getOperation(operationNumber: number): Promise<Cuenta.OperacionDetalle>;
  buy(body: Operar.Comprar): Promise<GenericResponse>;
  sell(body: Operar.Vender): Promise<GenericResponse>;
  fciRescue(body: Operar.RescateFCI): Promise<GenericResponse>;
  fciSubscription(body: Operar.SuscripcionFCI): Promise<GenericResponse>;
  getAllFCI(): Promise<Titulos.FCI[]>;
  getFCI(symbol: string): Promise<Titulos.FCI>;
  getPrice(market: Mercado, symbol: string): Promise<Titulos.Cotizacion>;
}
