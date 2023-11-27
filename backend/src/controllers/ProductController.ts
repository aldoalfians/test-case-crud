import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";
import ProductCategory from "../models/ProductCategory";
import { Op } from "sequelize";

interface IUserRequest extends Request {
  userId?: number;
  role?: string;
}

class ProductController {
  public async getProducts(req: IUserRequest, res: Response) {
    try {
      let response;
      if (req.role === "OPERATOR") {
        response = await Product.findAll({
          attributes: ["uuid", "plu", "name"],
          include: [
            {
              model: ProductCategory,
              attributes: ["id", "name", "active"],
              as: "category",
            },
            {
              model: User,
              attributes: ["role"],
              as: "user",
            },
          ],
        });
      } else {
        response = await Product.findAll({
          attributes: ["uuid", "plu", "name"],
          where: {
            userId: req.userId,
          },
          include: [
            {
              model: ProductCategory,
              attributes: ["id", "name", "active"],
              as: "category",
            },
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
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async getProductsPublic(req: IUserRequest, res: Response) {
    try {
      const response = await Product.findAll({
        attributes: ["uuid", "plu", "name"],
        include: [
          {
            model: ProductCategory,
            attributes: ["id", "name", "active"],
            as: "category",
          },
          {
            model: User,
            attributes: ["role"],
            as: "user",
          },
        ],
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async createProducts(req: IUserRequest, res: Response) {
    const { plu, name, categoryId } = req.body;
    const userId = req.userId;

    if (userId === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      await Product.create({
        plu,
        name,
        categoryId,
        userId,
      });
      res.status(201).json({ message: "Produk berhasil dibuat" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async updateProducts(req: IUserRequest, res: Response) {
    try {
      const product = await Product.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!product)
        return res.status(404).json({ msg: "Data tidak ditemukan" });
      const { plu, name, categoryId } = req.body;
      if (req.role === "OPERATOR") {
        await Product.update(
          { plu, name, categoryId },
          {
            where: {
              id: product.id,
            },
          }
        );
      } else {
        if (req.userId !== product.userId)
          return res.status(403).json({ msg: "Akses terlarang" });
        await Product.update(
          { plu, name, categoryId },
          {
            where: {
              [Op.and]: [{ id: product.id }, { userId: req.userId }],
            },
          }
        );
      }
      res.status(200).json({ msg: "Produk berhasil diupdate" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async getProductsById(req: IUserRequest, res: Response) {
    try {
      const product = await Product.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!product)
        return res.status(404).json({ msg: "Data tidak ditemukan" });
      const response = await Product.findOne({
        attributes: ["uuid", "plu", "name"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: ProductCategory,
            attributes: ["name", "active"],
            as: "category",
          },
          {
            model: User,
            attributes: ["role"],
            as: "user",
          },
        ],
      });

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async deleteProducts(req: IUserRequest, res: Response) {
    try {
      const product = await Product.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!product)
        return res.status(404).json({ msg: "Data tidak ditemukan" });

      if (req.role === "OPERATOR") {
        await Product.destroy({
          where: {
            id: product.id,
          },
        });
      } else {
        if (req.userId !== product.userId)
          return res.status(403).json({ msg: "Akses terlarang" });
        await Product.destroy({
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        });
      }
      res.status(200).json({ msg: "Produk berhasil didelete" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new ProductController();
