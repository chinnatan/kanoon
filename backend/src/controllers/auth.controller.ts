import { Request, Response } from "express";
import User from "../models/db/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Handle } from "../handle/handle";
import ServerException from "../exception/server.exception";
import Store from "../models/db/Store";
import sequelize from "../config/database";
import AuthUtil from "../utils/auth.util";
import { UserModel } from "../models/user.model";
import { logger } from "../utils/logger.util";

export const register = async (req: Request, res: Response) => {
  const h = new Handle("register", req, res);
  const t = await sequelize.transaction();
  try {
    const { username, password, fullname, role, store_name } = req.body;
    if (!username) {
      throw new ServerException("กรุณากรอกชื่อผู้ใช้งาน", 400);
    }
    if (!password) {
      throw new ServerException("กรุณากรอกรหัสผ่าน", 400);
    }
    if (!fullname) {
      throw new ServerException("กรุณากรอกชื่อและนามสกุล", 400);
    }
    if (!role) {
      throw new ServerException("กรุณากรอกตำแหน่ง", 400);
    }

    let store = null;
    if (role === "admin") {
      store = await Store.create({ name: store_name }, { transaction: t }).catch(() => {
        throw new ServerException("สมัครสมาชิกไม่สำเร็จ", 400);
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(
      {
        username,
        password: hashedPassword,
        fullname: fullname,
        role,
        store_id: store?.id,
      },
      { transaction: t }
    ).catch(() => {
      throw new ServerException("เกิดข้อผิดพลาดกรุณาติดต่อผู้ดูแลระบบ", 400);
    });
    await t.commit();
    h.success("สมัครสมาชิกสำเร็จ", 201);
  } catch (error) {
    await t.rollback();
    h.error(error, error, 500);
  }
};

export const login = async (req: Request, res: Response) => {
  const h = new Handle("login", req, res);
  try {
    logger.info("%s", req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ServerException("กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบถ้วน", 400);
    }

    User.hasOne(Store, { foreignKey: "id", sourceKey: "store_id" });

    const user = await User.findOne({
      include: [{ model: Store, required: true }],
      where: { username },
    })
      .then((user) => user?.toJSON())
      .catch(() => {
        throw new ServerException("ไม่พบผู้ใช้งาน", 404);
      });

    if (!user) {
      throw new ServerException("ไม่พบผู้ใช้งาน", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ServerException("รหัสผ่านไม่ถูกต้อง", 400);
    }

    let userInfo = new UserModel(user.id, user.username, user.fullname, user.role, user.store_id, user.store.name);
    const token = AuthUtil.generateToken(user);
    const refreshToken = AuthUtil.generateRefreshToken(user);

    userInfo.token = token;
    userInfo.refresh_token = refreshToken;

    await AuthUtil.updateRefreshToken(refreshToken, user.id);

    h.success(userInfo);
  } catch (error) {
    h.error(error, error, 500);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const h = new Handle("refreshToken", req, res);
  try {
    const oldRefreshToken = await User.findOne({
      attributes: ["refresh_token"],
      where: {
        id: req.user.id,
      },
    })
      .then((user) => user?.toJSON())
      .catch(() => {
        throw new ServerException("ไม่พบผู้ใช้งาน", 404);
      });

    if (!oldRefreshToken) {
      throw new ServerException("ไม่พบโทเค็น", 404);
    }

    if (req.user != undefined) {
      delete req.user.token;
      delete req.user.refresh_token;

      const accessToken = AuthUtil.generateToken(req.user);
      const refreshToken = AuthUtil.generateRefreshToken(req.user);

      req.user.token = accessToken;
      req.user.refresh_token = refreshToken;

      await AuthUtil.updateRefreshToken(refreshToken, req.user.id);

      return h.success({
        token: accessToken,
        refresh_token: refreshToken,
      });
    }

    throw new ServerException("เกิดข้อผิดพลาดกรุณาติดต่อผู้ดูแลระบบ", 400);
  } catch (error) {
    h.error(error, error, 500);
  }
};
