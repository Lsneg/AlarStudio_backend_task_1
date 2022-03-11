import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const path = __dirname + '/../build/';
  res.sendFile('index.html', { root: path });
});

export default router;
