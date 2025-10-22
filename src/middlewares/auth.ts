import { Request, Response, NextFunction } from "express";  
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta';

export interface AuthRequest extends Request {
    userId?: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({message: 'Token não Fornecido'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
        req.userId = decoded.userId;
        next();
    }catch (error){
        return res.status(401).json({message: 'Token inválido'});
    }
}