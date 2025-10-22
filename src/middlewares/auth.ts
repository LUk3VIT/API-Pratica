import { Request, Response, NextFunction } from "express";  
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta';

export interface AuthRequest extends Request {
    userId?: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    
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