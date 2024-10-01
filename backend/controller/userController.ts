import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userServices from "../services/userService"

dotenv.config()

// @Route /users/register
// @Method POST
// @Body: { username, password }
// @Returns: { id }
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400);
            throw new Error("bad request");
        }
        const newUser = await userServices.createUser(username, password);

        res.status(201).json({ id: newUser.id });
    } catch (error) {
        next(error)
    }
}

// @Route /users/login
// @Method POST
// @Body: { username, password }
// @Returns: { token }

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400);
            throw new Error("bad request");
        }
        const user: User | null = await userServices.authenticateUser(username, password);
        if (!user) {
            res.status(401);
            throw new Error("bad request");
        }
        if (!process.env.JWT_SECRET) {
            res.status(500);
            throw new Error("Something went wrong")
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
}

