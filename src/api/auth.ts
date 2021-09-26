import axios, { AxiosRequestConfig } from "axios";

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  ".issued": string;
  ".expires": string;
  ".refreshexpires": string;
}

const authenticate = async (
  username: string | undefined,
  password: string | undefined,
  apiUrl: string | undefined
): Promise<AuthResponse> => {
  if (!apiUrl) throw new Error(`Missing URL value ${apiUrl}`);
  if (!username) throw new Error(`Missing username value ${username}`);
  if (!password) throw new Error(`Missing URL value ${password}`);

  const params = new URLSearchParams();
  params.append("password", password);
  params.append("username", username);
  params.append("grant_type", "password");
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  console.log("Requesting Authentication with: ", { params, config });
  try {
    const response = await axios.post<AuthResponse>(
      `${apiUrl}/token`,
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
};

export { authenticate };
