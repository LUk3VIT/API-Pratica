import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta';

interface LoginUser {
    id: number;
    email: string;
    password: string;
    name: string;
}

export class AuthController {
    private users: LoginUser[] = [
        {
            id: 1,
            email: 'admin@teste.com',
            password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            name: 'Admin'
        }
    ];

    async login(req: Request, res: Response): Promise<Response>{
        const { email, password } = req.body;

        if (!email || !password){
            return res.status(400).json({ message: 'Email e senha são obrigatórios'});
        }

        const user = this.users.find(u => u.email === email);
        if (!user){
            return res.status(401).json({ message: 'Credenciais inválidas'});
        }
        
        const isValiPassword = await bcrypt.compare(password, user.password);
        if (!isValiPassword){
            return res.status(401).json({ message: 'Credenciais inválidas'});
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }

    async register(req: Request, res: Response): Promise<Response> {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const existingUser = this.users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser: LoginUser = {
            id: this.users.length + 1,
            name,
            email,
            password: hashedPassword
        };

        this.users.push(newUser);

        const token = jwt.sign({userId: newUser.id }, JWT_SECRET, { expiresIn: '24h'});

        return res.status(201).json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    }
}

