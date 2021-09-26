require("dotenv").config();
import { PASSWORD, USERNAME, API_URL } from "./config";
import * as api from "./api";
console.log(PASSWORD, USERNAME, API_URL);

api.authenticate(USERNAME, PASSWORD, API_URL);
