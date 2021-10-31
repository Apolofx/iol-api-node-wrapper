import HttpClient from "./http-client";
import Authentication from "./auth";
import { constants } from "../config/";
import { AxiosRequestConfig } from "axios";
import { endpoints } from "../config/constants";
import { Cuenta } from "../types/IolApiCuenta";
import { Titulos } from "../types/IolApiTitulos";
import { Operar } from "../types/IolApiOperar";
import {
  Mercado,
  IolAuthData,
  Country,
  GenericResponse,
  IolClientInterface,
  OperationsFilter,
} from "../types/IolClient";
const { endpoints: api } = constants;
/**
 * Singleton approach in order to reuse same http httpInstance across all files.
 *
 */
export default class IolClient
  extends HttpClient
  implements IolClientInterface
{
  private static classInstance: IolClient;
  private static auth: Authentication;
  private static authData: IolAuthData;

  private constructor(authData: IolAuthData) {
    super(authData.url);
    IolClient.auth = new Authentication(authData);
  }

  public static getInstance() {
    if (!this.authData)
      throw new Error(
        "Missing authenticacion data, IolClient.config() must be called with user authentication data before calling getInstance()."
      );
    if (!this.classInstance) {
      this.classInstance = new IolClient(this.authData);
      this.initializeConnection();
    }
    return this.classInstance;
  }

  public static config(authData: IolAuthData) {
    this.authData = authData;
  }

  // ACCOUNT METHODS
  public async getAccountStatus() {
    const accountStatus = await this.httpInstance.get<Cuenta.EstadoDeCuenta>(
      api.v2.estadocuenta
    );
    return accountStatus;
  }

  public async getPortfolio(country: Country) {
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

  public async getOperations(filters: OperationsFilter) {
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

  private static initializeConnection() {
    this.classInstance.httpInstance.interceptors.request.use(
      async (requestConfig) => await this.useAuth(requestConfig)
    );
  }

  private static async useAuth(
    requestConfig: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    const newToken = await this.auth.getToken();
    requestConfig.headers["Authorization"] = `bearer ${newToken}`;
    console.log(requestConfig);
    return requestConfig;
  }
}
