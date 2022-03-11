import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Получаем jwt token из заголовков
  const token = <string>req.headers["authorization"]?.replace("Bearer ","");
  let jwtPayload;

  //Проверяем токен на валидность
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // если токен не валидный отдаем 401 (unauthorized)
    res.status(401).json({
        status: 401
    });
    return;
  }

  //Токен валиден 1 час
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  next();
};
