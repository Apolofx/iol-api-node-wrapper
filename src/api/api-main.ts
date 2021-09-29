import HttpClient from "./http-client";
import Authentication from "./auth";
import { constants } from "../config/";
import { AxiosRequestConfig } from "axios";

/**
 * Singleton approach in order to reuse same http instance across all files.
 *
 */
export default class IolClient
  extends HttpClient
  implements IolClientInterface
{
  private static classInstance: IolClient;
  private static auth = new Authentication();
  private static authData: IolAuthData;

  private constructor() {
    super(constants.IOL_API_URL);
  }

  public static async getInstance() {
    if (!this.classInstance) {
      this.classInstance = new IolClient();
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
      "/api/v2/estadocuenta"
    );
    return accountStatus;
  }

  public async getPortfolio(country: Country) {
    const portfolio = await this.instance.get<Cuenta.Portafolio>(
      `/api/v2/portafolio/${country}`
    );
    return portfolio;
  }

  public async deleteOperation(operationNumber: number) {
    const result = await this.instance.delete(
      `/api/v2/operaciones/${operationNumber}`
    );
    return result;
  }

  public async getOperation(operationNumber: number) {
    const operation = await this.instance.get<Cuenta.OperacionDetalle>(
      `/api/v2/operaciones/${operationNumber}`
    );
    return operation;
  }

  public async getOperations(filters: OperationsFilter) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach((item) => {
      params.set(`filtro.${item[0]}`, item[1]);
    });
    const operations = await this.instance.get<Cuenta.Operaciones>(
      "/api/v2/operaciones",
      { params }
    );
    return operations;
  }

  private static async initializeConnection() {
    if (!this.authData)
      throw new Error(
        "Missing authenticacion data, IolClient.config() must be called with user authentication data before instanciation."
      );
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
