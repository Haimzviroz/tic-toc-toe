import { Response, Request, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ message: "Something went wrong!" })
        return;
    }
    const JWT_SECRET: string = process.env.JWT_SECRET;
    const authHeader: string =
        req.headers["authorization"] as string ||
        req.headers["Authorization"] as string;

    if (!authHeader) {
        res.status(401).json({ message: "Access token is missing!" })
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;

        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }

}

export default authMiddleware;