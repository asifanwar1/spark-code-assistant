import { Router } from "express";
import {
    signup,
    signin,
    logout,
    refreshToken,
    getProfile,
} from "../controllers/auth";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/refresh", refreshToken);

// Protected routes (would need middleware)
router.post("/auth/logout", authenticateToken, logout);
router.get("/auth/profile/:userId", getProfile);

export default router;
