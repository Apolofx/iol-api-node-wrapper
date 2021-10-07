import { AxiosRequestConfig } from "axios";
import HttpClient from "./http-client";

export default class Authentication extends HttpClient {
  public accessToken: string = "";
  private refreshToken: string = "";
  private expirationDate: string = "";

  public constructor(apiURL: string) {
    super(apiURL);
  }

  public async authenticate(authData: IolAuthData): Promise<void> {
    const params = new URLSearchParams();
    params.append("password", authData.password);
    params.append("username", authData.username);
    params.append("grant_type", "password");
    const baseURL = this.instance.defaults.baseURL;
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    console.log("Requesting Authentication with: ", { params, config });
    const response = await this.instance.post<AuthResponse>(
      `${baseURL}/token`,
      params,
      config
    );
    console.log("Successfully authenticated: ", response);
    this.accessToken = response.access_token;
    this.expirationDate = response[".expires"];
    this.refreshToken = response.refresh_token;
  }

  public async getNewToken(): Promise<void> {
    const params = new URLSearchParams();
    params.append("refresh_token", this.refreshToken);
    params.append("grant_type", "refresh_token");
    const baseURL = this.instance.defaults.baseURL;
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    console.log("Requesting Authentication with: ", { params, config });
    const response = await this.instance.post<AuthResponse>(
      `${baseURL}/token`,
      params,
      config
    );
    console.log(response);
    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;
    this.expirationDate = response[".expires"];
  }

  public tokenExpired(): boolean {
    const expiration = new Date(this.expirationDate);
    const now = new Date();
    return now > expiration;
  }
}
