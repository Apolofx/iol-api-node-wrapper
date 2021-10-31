import { AxiosRequestConfig } from "axios";
import HttpClient from "./http-client";
import { IolAuthData, AuthResponse } from "../types/IolClient";

export default class Authentication extends HttpClient {
  public accessToken: string = "";
  private authData: IolAuthData;
  private refreshToken: string = "";
  private expirationDate: string = "";
  private refreshTokenExpiration: string = "";

  public constructor(authData: IolAuthData) {
    super(authData.url);
    this.authData = authData;
  }

  private async authenticate(): Promise<void> {
    const params = new URLSearchParams();
    params.append("password", this.authData.password);
    params.append("username", this.authData.username);
    params.append("grant_type", "password");
    const baseURL = this.httpInstance.defaults.baseURL;
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    console.log("Requesting Authentication with: ", { params, config });
    const response = await this.httpInstance.post<AuthResponse>(
      `${baseURL}/token`,
      params,
      config
    );
    console.log("Successfully authenticated: ", response);
    this.setAuthResponse(response);
  }

  private async getNewToken(): Promise<string> {
    const params = new URLSearchParams();
    params.append("refresh_token", this.refreshToken);
    params.append("grant_type", "refresh_token");
    const baseURL = this.httpInstance.defaults.baseURL;
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    console.log("Requesting new token: ", { params, config });
    const response = await this.httpInstance.post<AuthResponse>(
      `${baseURL}/token`,
      params,
      config
    );
    console.log(response);
    this.setAuthResponse(response);
    return this.accessToken;
  }

  private tokenExpired(): boolean {
    console.log("checking token expiration");
    const expiration = new Date(this.expirationDate);
    const now = new Date();
    return now > expiration;
  }

  private refreshTokenExpired(): boolean {
    console.log("checking refresh token expiration");
    const expiration = new Date(this.refreshTokenExpiration);
    const now = new Date();
    return now > expiration;
  }

  private setAuthResponse(response: AuthResponse): void {
    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;
    this.expirationDate = response[".expires"];
    this.refreshTokenExpiration = response[".refreshexpires"];
  }

  public async getToken(): Promise<string> {
    if (!this.accessToken) {
      await this.authenticate();
    }
    if (this.tokenExpired()) {
      if (this.refreshTokenExpired()) {
        await this.authenticate();
      } else {
        await this.getNewToken();
      }
    }
    return this.accessToken;
  }
}
