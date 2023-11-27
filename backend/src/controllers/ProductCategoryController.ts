import { Request, Response } from "express";

import User from "../models/User";
import ProductCategory from "../models/ProductCategory";

interface IUserRequest extends Request {
  userId?: number;
  role?: string;
}

class ProductCategoryController {
  public async getProductCategories(req: IUserRequest, res: Response) {
    try {
      console.log(req.role);
      let response;
      if (req.role === "OPERATOR") {
        response = await ProductCategory.findAll({
          attributes: ["id", "uuid", "name", "active", "userId"],
          include: [
            {
              model: User,
              attributes: ["role"],
              as: "user",
            },
          ],
        });
      } else {
        response = await ProductCategory.findAll({
          attributes: ["id", "uuid", "name", "active", "userId"],
          where: {
            userId: req.userId,
          },
          include: [
            {
              model: User,
              attributes: ["role"],
              as: "user",
            },
          ],
        });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async createProductCategory(req: IUserRequest, res: Response) {
    const { name } = req.body;
    const userId = req.userId;

    if (userId === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      await ProductCategory.create({
        active: true,
        name,
        userId,
      });
      res.status(201).json({ message: "Kategori berhasil di buat" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new ProductCategoryController();
