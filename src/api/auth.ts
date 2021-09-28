import axios, { AxiosRequestConfig } from "axios";
import { constants, USERNAME, PASSWORD } from "../config";

export default class Authentication {
  public accessToken: string = "";
  private refreshToken: string = "";
  private expirationDate: string = "";

  private constructor(
    accessToken: string,
    refreshToken: string,
    expirationDate: string
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expirationDate = expirationDate;
  }

  public static async init(authData: IolAuthData) {
    const auth = await this.authenticate(authData);
    console.log(auth.access_token);
    return new Authentication(
      auth.access_token,
      auth.refresh_token,
      auth[".expires"]
    );
  }

  public static async authenticate(
    authData: IolAuthData
  ): Promise<AuthResponse> {
    const params = new URLSearchParams();
    params.append("password", authData.password);
    params.append("username", authData.username);
    params.append("grant_type", "password");
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    console.log("Requesting Authentication with: ", { params, config });
    try {
      const response = await axios.post<AuthResponse>(
        `${constants.IOL_API_URL}/token`,
        params,
        config
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const errorResponse = {
          status: error.response.status,
          data: error.response.data,
        };
        console.log(JSON.stringify(errorResponse, null, 2));
      }
      throw error;
    }
  }

  public async getNewToken(): Promise<void> {
    const params = new URLSearchParams();
    params.append("refresh_token", this.refreshToken);
    params.append("grant_type", "refresh_token");
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    console.log("Requesting Authentication with: ", { params, config });
    try {
      const response = await axios.post<AuthResponse>(
        `${constants.IOL_API_URL}/token`,
        params,
        config
      );
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.expirationDate = response.data[".expires"];
    } catch (error: any) {
      if (error.response) {
        const errorResponse = {
          status: error.response.status,
          data: error.response.data,
        };
        console.log(JSON.stringify(errorResponse, null, 2));
      }
      throw error;
    }
  }

  public tokenExpired(): boolean {
    const expiration = new Date(this.expirationDate);
    const now = new Date();
    return now > expiration;
  }
}
