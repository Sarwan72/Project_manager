import express from "express";
import { signup, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: res.locals.user,
  });
});
export default router;
