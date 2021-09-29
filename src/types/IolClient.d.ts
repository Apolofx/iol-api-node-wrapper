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

interface IolClientInterface {
  getAccountStatus(): Promise<Cuenta.EstadoDeCuenta>;
  getPortfolio(country: Country): Promise<Cuenta.Portafolio>;
  getOperations(filter: OperationsFilter): Promise<Cuenta.Operaciones>;
  getOperation(operationNumber: number): Promise<Cuenta.OperacionDetalle>;
}
