import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import root from "./root";

const routes = Router();

routes.use("/api/v1/auth", auth);
routes.use("/api/v1/user", user);
routes.use("/", root);


export default routes;
