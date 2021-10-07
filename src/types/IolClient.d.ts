interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  ".issued": string;
  ".expires": string;
  ".refreshexpires": string;
}

interface IolAuthData {
  url: string;
  password: string;
  username: string;
}

type Country = "argentina" | "estados_Unidos";
interface OperationsFilter {
  numero: number;
  estado: "todas" | "pendientes" | "terminadas" | "canceladas";
  fechaDesde: Date;
  fechaHasta: Date;
  pais: Country;
}

interface GenericResponse {
  ok?: boolean;
  messages?: Message[];
}
interface Message {
  title?: string;
  description?: string;
}

interface IolClientInterface {
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
  getPrice(market: string, symbol: string): Promise<Titulos.Cotizacion>;
}
