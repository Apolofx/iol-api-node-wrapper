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
 * Singleton approach in order to reuse same http instance across all files.
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
    IolClient.auth = new Authentication(authData.url);
  }

  public static async getInstance() {
    if (!this.authData)
      throw new Error(
        "Missing authenticacion data, IolClient.config() must be called with user authentication data before calling getInstance()."
      );
    if (!this.classInstance) {
      this.classInstance = new IolClient(this.authData);
      await this.initializeConnection();
    }
    return this.classInstance;
  }

  public static config(config: IolAuthData) {
    this.authData = config;
  }

  // ACCOUNT METHODS
  public async getAccountStatus() {
    const accountStatus = await this.instance.get<Cuenta.EstadoDeCuenta>(
      api.v2.estadocuenta
    );
    return accountStatus;
  }

  public async getPortfolio(country: Country) {
    const portfolio = await this.instance.get<Cuenta.Portafolio>(
      `${api.v2.portafolio}/${country}`
    );
    return portfolio;
  }

  public async deleteOperation(operationNumber: number) {
    const result = await this.instance.delete<GenericResponse>(
      `${api.v2.operaciones}/${operationNumber}`
    );
    return result;
  }

  public async getOperation(operationNumber: number) {
    const operation = await this.instance.get<Cuenta.OperacionDetalle>(
      `${api.v2.operaciones}/${operationNumber}`
    );
    return operation;
  }

  public async getOperations(filters: OperationsFilter) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach((item) => {
      params.set(`filtro.${item[0]}`, item[1]);
    });
    const operations = await this.instance.get<Cuenta.Operaciones>(
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
    const response = await this.instance.post<GenericResponse>(
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
    const response = await this.instance.post<GenericResponse>(
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
    const response = await this.instance.post<GenericResponse>(
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
    const response = await this.instance.post<GenericResponse>(
      api.v2.operar.suscripcionFci,
      data,
      config
    );
    return response;
  }

  public async getAllFCI() {
    const response = await this.instance.get<Titulos.FCI[]>(
      endpoints.v2.titulos.fci
    );
    return response;
  }

  public async getFCI(symbol: string) {
    const response = await this.instance.get<Titulos.FCI>(
      `${endpoints.v2.titulos.fci}/${symbol}`
    );
    return response;
  }

  public async getPrice(market: Mercado, symbol: string) {
    const response = await this.instance.get<Titulos.Cotizacion>(
      endpoints.v2.titulos.cotizacion(market, symbol)
    );
    return response;
  }

  private static async initializeConnection() {
    await this.auth.authenticate(this.authData);
    this.classInstance.instance.interceptors.request.use(
      async (config) => await this.useAuth(config)
    );
  }

  private static async useAuth(
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    if (this.auth.tokenExpired()) {
      await this.auth.getNewToken();
    }
    config.headers["Authorization"] = `bearer ${this.auth.accessToken}`;
    return config;
  }
}
