import express from "express";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
import {
  approveUser,
  getPendingUsers,
} from "../controllers/admin.controllers.js";

const router = express.Router();
router.get("/pending-users", protectRoute, isAdmin, getPendingUsers);
router.put("/approve/:id", protectRoute, isAdmin, approveUser);

// router.put("/update-profile", updateProfile);
export default router;
