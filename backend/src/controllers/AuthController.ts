import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface TokenPayload {
  id: number;
}

const blacklist: Set<string> = new Set();

class AuthController {
  public async register(req: Request, res: Response) {
    const { name, username, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Password dan confirm passowrd tidak sama" });

    const hashPassword = await argon2.hash(password);

    try {
      await User.create({
        name,
        username,
        password: hashPassword,
        role,
      });
      res.status(201).json({ message: "Register Berhasil" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!user)
        return res.status(404).json({ message: "User tidak ditemukan" });

      const match = await argon2.verify(user!.password, req.body.password);

      if (!match) return res.status(400).json({ message: "password salah" });

      const token = jwt.sign({ id: user!.uuid }, "passwordKey");
      const uuid = user!.uuid;
      const name = user!.name;
      const username = user!.username;
      const role = user!.role;
      res.status(200).json({ uuid, name, username, role, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async getUserLogin(req: Request, res: Response) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      let verified = jwt.verify(token, "passwordKey") as TokenPayload;
      if (!verified) return res.json(false);

      const user = await User.findOne({
        attributes: [
          "uuid",
          "name",
          "username",
          "role",
          "createdAt",
          "updatedAt",
        ],
        where: {
          uuid: verified.id,
        },
      });

      if (!user)
        return res.status(404).json({ message: "User tidak ditemukan" });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (token) {
        blacklist.add(token);
        res.status(200).json({ message: "Berhasil Logout" });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new AuthController();
