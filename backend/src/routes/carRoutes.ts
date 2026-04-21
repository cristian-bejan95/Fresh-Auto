import { Router } from "express";
import {
  createCar,
  deleteCar,
  getCarById,
  getCars,
  updateCar,
  getCarStats,
} from "../controllers/carController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getCars);
router.get("/stats", getCarStats);
router.get("/:id", getCarById);
router.post("/", protect, createCar);
router.put("/:id", protect, updateCar);
router.delete("/:id", protect, deleteCar);

export default router;
