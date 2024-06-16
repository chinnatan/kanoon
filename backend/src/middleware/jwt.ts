import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.util";
import { UserModel } from "../models/user.model";
import { Handle } from "../handle/handle";

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";
const JWT_REFERSH_TOKEN_SECRET_KEY: string = process.env.JWT_REFERSH_TOKEN_SECRET_KEY || "";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const h = new Handle("auth", req, res);

  const authHeader = req.header("Authorization");
  if (!authHeader) return h.error("คุณไม่มีสิทธิ์ในการเข้าถึง", 401);

  try {
    const token = authHeader.replace("Bearer ", "");
    logger.info(token);
    const verified = jwt.verify(token, JWT_SECRET_KEY);
    const jsonParse = JSON.parse(JSON.stringify(verified));
    const userInfo = new UserModel(jsonParse.id, jsonParse.username, jsonParse.fullname, jsonParse.role, jsonParse.store_id, jsonParse.store_name);
    req.user = userInfo;
    next();
  } catch (err) {
    h.error("โทเค็นไม่ถูกต้อง", 403);
  }
};

export const refreshTokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  try {
    if (!authHeader) {
      return res.status(403).send("<center>You do not have permission to use this section.</center>");
    }

    const token = authHeader.replace("Bearer ", "");
    jwt.verify(token, JWT_REFERSH_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) throw new Error(err.stack);
      req.user = decoded as UserModel;
      req.user.refresh_token = token;

      delete req.user.exp;
      delete req.user.iat;
    });
  } catch (err) {
    return res.status(403).send("<center>You do not have permission to use this section.</center>");
  }
  return next();
};
