import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient {
  protected readonly httpInstance: AxiosInstance;

  public constructor(baseURL: string) {
    this.httpInstance = axios.create({ baseURL });
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.httpInstance.interceptors.response.use(
      this.handleResponse,
      this.handleErrors
    );
  }
  private handleRequest() {}
  private handleResponse({ data }: AxiosResponse) {
    return data;
  }
  private handleErrors(error: AxiosError) {
    let formatedError: any = error;
    if (error.isAxiosError) {
      if (error.response) {
        formatedError = {
          data: error.response.data,
          status: error.response.status,
        };
      } else if (error.request) {
        formatedError = { message: error.message, code: error.code };
      }
    }
    throw formatedError;
  }
}
