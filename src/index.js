import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./domain/response.js";
import { status } from "http-status";
import log from "./util/logger.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json(new Response(status.OK, "Server is running", null));
});

app.listen(PORT, () => {
  log.info(`Server is running on ${ip.address()}:${PORT}`);
});
