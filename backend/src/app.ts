import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { PORT } from "./env-value";
import { connectDatabase } from "./config";
import routes from "./routes";
import { errorController } from "./controllers";

const app = express();
app.use(cors());

connectDatabase();

app.set("port", PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.use(errorController.error);
app.use(errorController.notFound);

export default app;
