import dotenv from "dotenv";
dotenv.config();

import { PASSWORD, USERNAME } from "./config";
import { constants } from "./config";
import { IolConnection } from "./api";

async function main() {
  try {
    IolConnection.config({
      username: USERNAME,
      password: PASSWORD,
      url: constants.IOL_API_URL,
    });
    const iol = await IolConnection.getInstance();
    const account = await iol.getAccountStatus();
    console.log(account);
  } catch (e) {
    console.log(e);
  }
}

main();
