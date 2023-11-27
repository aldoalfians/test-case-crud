import express from "express";
import productCategoryController from "../controllers/ProductCategoryController";
import authMiddleware from "../middleware/AuthUser";

const router = express.Router();

router.get(
  "/api/category",
  authMiddleware.verifyUser,
  productCategoryController.getProductCategories
);
router.post(
  "/api/category",
  authMiddleware.verifyUser,
  authMiddleware.adminOnly,
  productCategoryController.createProductCategory
);
export default router;
