import { Router } from "express";
import { authMiddleware } from "@repo/middleware";

const router = Router();

router.post("/", authMiddleware, (req, res) => {
  res.json({ message: "create a craft" });
});

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "show all craft" });
});

router.get("/:craftId", authMiddleware, (req, res) => {
  const id = req.params.craftId;
  res.json({ message: `show ${id} craft ` });
});

export const craftRouter = router;
