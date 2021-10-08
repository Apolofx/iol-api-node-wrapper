import dotenv from "dotenv";
dotenv.config();

import { PASSWORD, USERNAME } from "./config";
import { constants } from "./config";
import { IolClient } from ".";

async function main() {
  IolClient.config({
    username: USERNAME,
    password: PASSWORD,
    url: constants.IOL_API_URL,
  });
  try {
    const iol = await IolClient.getInstance();
    const account = await iol.getAccountStatus();
    console.log(account);
    const a = await iol.getAllFCI();
    const b = await iol.getPortfolio("argentina");
    const c = await iol.getPrice("bCBA", "GGAL");
    console.log(c);
  } catch (e) {
    console.log("ERROR: ", e);
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

main();
