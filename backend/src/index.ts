import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

// Подключаемся к БД
createConnection()
  .then(async connection => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use("/", routes);
    app.use('/static', express.static(__dirname + '/build/static'));

    app.listen(3001, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));
