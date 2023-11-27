import express from "express";

import authController from "../controllers/AuthController";

const router = express.Router();

router.get("/api/me", authController.getUserLogin);
router.post("/api/login", authController.login);
router.post("/api/regist", authController.register);
router.delete("/api/logout", authController.logout);

export default router;
