import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

interface TokenPayload {
  id: number;
}

interface IUserRequest extends Request {
  userId?: number;
  role?: string;
}

class AuthMiddleware {
  public async verifyUser(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let verified = jwt.verify(token, "passwordKey") as TokenPayload;
    if (!verified) return res.json(false);

    const user = await User.findOne({
      where: {
        uuid: verified.id,
      },
    });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    req.userId = user.id;
    req.role = user.role;
    next();
  }

  public async adminOnly(req: IUserRequest, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let verified = jwt.verify(token, "passwordKey") as TokenPayload;
    if (!verified) return res.json(false);

    const user = await User.findOne({
      where: {
        uuid: verified.id,
      },
    });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    if (user.role !== "OPERATOR")
      return res.status(403).json({ message: "Akses terlarang" });
    next();
  }
}

export default new AuthMiddleware();
