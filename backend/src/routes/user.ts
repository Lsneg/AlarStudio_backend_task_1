import { Router } from "express";
  import UserController from "../controllers/UserController";
  import { checkJwt } from "../middlewares/checkJwt";
  import { checkRole } from "../middlewares/checkRole";

  const router = Router();

  // Получить все пользователей
  router.get("/", [checkJwt], UserController.listAll);

  // Получить пользователя по id 
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    UserController.getOneById
  );

  // Создает новго пользователя
  router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

  // Редактирование пользователя
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
  );

  // Удалить пользователя
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.deleteUser
  );

  export default router;
