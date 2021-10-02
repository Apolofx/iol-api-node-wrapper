import dotenv from "dotenv";
dotenv.config();

import { PASSWORD, USERNAME, API_URL } from "./config";
import { IolConnection } from "./api";

async function main() {
  try {
    IolConnection.config({ username: USERNAME, password: PASSWORD });
    const iol = await IolConnection.getInstance();
    await iol.getAccountStatus();
  } catch (e) {
    console.log(e);
  }
}

main();
