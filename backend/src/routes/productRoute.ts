import express from "express";
import productController from "../controllers/ProductController";
import authMiddleware from "../middleware/AuthUser";

const router = express.Router();

router.get("/api/products/public", productController.getProductsPublic);

router.get(
  "/api/products",
  authMiddleware.verifyUser,
  productController.getProducts
);

router.get("/api/products/:id", productController.getProductsById);

router.post(
  "/api/products",
  authMiddleware.verifyUser,
  authMiddleware.adminOnly,
  productController.createProducts
);

router.put(
  "/api/products/:id",
  authMiddleware.verifyUser,
  authMiddleware.adminOnly,
  productController.updateProducts
);

router.delete(
  "/api/products/:id",
  authMiddleware.verifyUser,
  authMiddleware.adminOnly,
  productController.deleteProducts
);

export default router;
