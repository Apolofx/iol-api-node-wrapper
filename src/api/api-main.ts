import HttpClient from "./http-client";
import Authentication from "./auth";
import { constants } from "../config/";
import { AxiosRequestConfig } from "axios";
import { endpoints } from "../config/constants";
import {
  IolClientInterface,
  IolAuthData,
  Cuenta,
  GenericResponse,
  OperacionesFiltro,
  Operar,
  Titulos,
  Pais,
  Mercado,
} from "../types";
const { endpoints: api } = constants;
export default class IolClient
  extends HttpClient
  implements IolClientInterface
{
  private auth: Authentication;

  public constructor(authData: IolAuthData) {
    if (!authData) throw new Error("Missing authenticacion data");
    super(authData.url);
    this.auth = new Authentication(authData);
    this.initializeConnection();
  }

  // MiCuenta
  public async getAccountStatus() {
    const accountStatus = await this.httpInstance.get<Cuenta.EstadoDeCuenta>(
      api.v2.estadocuenta
    );
    return accountStatus;
  }

  public async getPortfolio(country: Pais) {
    const portfolio = await this.httpInstance.get<Cuenta.Portafolio>(
      `${api.v2.portafolio}/${country}`
    );
    return portfolio;
  }

  public async deleteOperation(operationNumber: number) {
    const result = await this.httpInstance.delete<GenericResponse>(
      `${api.v2.operaciones}/${operationNumber}`
    );
    return result;
  }

  public async getOperation(operationNumber: number) {
    const operation = await this.httpInstance.get<Cuenta.OperacionDetalle>(
      `${api.v2.operaciones}/${operationNumber}`
    );
    return operation;
  }

  public async getOperations(filters: OperacionesFiltro) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach((item) => {
      params.set(`filtro.${item[0]}`, item[1]);
    });
    const operations = await this.httpInstance.get<Cuenta.Operaciones>(
      api.v2.operaciones,
      { params }
    );
    return operations;
  }

  //Operar
  public async buy(data: Operar.Comprar) {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await this.httpInstance.post<GenericResponse>(
      api.v2.operar.comprar,
      data,
      config
    );
    return response;
  }
  public async sell(data: Operar.Vender) {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await this.httpInstance.post<GenericResponse>(
      api.v2.operar.vender,
      data,
      config
    );
    return response;
  }
  public async fciRescue(data: Operar.RescateFCI) {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await this.httpInstance.post<GenericResponse>(
      api.v2.operar.rescateFci,
      data,
      config
    );
    return response;
  }
  public async fciSubscription(data: Operar.SuscripcionFCI) {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await this.httpInstance.post<GenericResponse>(
      api.v2.operar.suscripcionFci,
      data,
      config
    );
    return response;
  }

  //Titulos
  public async getAllFCI() {
    const response = await this.httpInstance.get<Titulos.FCI[]>(
      endpoints.v2.titulos.fci
    );
    return response;
  }

  public async getFCI(symbol: string) {
    const response = await this.httpInstance.get<Titulos.FCI>(
      `${endpoints.v2.titulos.fci}/${symbol}`
    );
    return response;
  }

  public async getPrice(market: Mercado, symbol: string) {
    const response = await this.httpInstance.get<Titulos.Cotizacion>(
      endpoints.v2.titulos.cotizacion(market, symbol)
    );
    return response;
  }

  public async getOptions(market: Mercado, symbol: string) {
    const response = await this.httpInstance.get<Titulos.Opciones>(
      endpoints.v2.titulos.opciones(market, symbol)
    );
    return response;
  }

  private initializeConnection() {
    this.httpInstance.interceptors.request.use(
      async (requestConfig) => await this.useAuth(requestConfig)
    );
  }

  //TODO check the latency introduced by the useAuth requests middleware
  private async useAuth(
    requestConfig: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    const newToken = await this.auth.getToken();
    requestConfig.headers["Authorization"] = `bearer ${newToken}`;
    console.log(requestConfig);
    return requestConfig;
  }
}
