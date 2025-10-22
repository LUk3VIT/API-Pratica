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
    private users: LoginUser[] = [];

    async login(req: Request, res: Response): Promise<Response>{
        const { email, password } = req.body;

        const user = this.users.find(u => u.email === email);

        if (!user){
            return res.status(401).json({ message: 'Credenciais inválidas'});
        }
        
        const isValiPassword = await bcrypt.compare(password, user.password);
        if (!isValiPassword){
            return res.status(401).json({ message: 'Credenciais inválidas'});
        }

        const token = jwt.sign(
            { userId: user.id, unserName: user.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('---- token', token);

        return res.json({ token: token });
    }

    async register(req: Request, res: Response): Promise<Response> {
        const {name, email, password} = req.body;

        //TODO Validar se todas as informações forma enviada
        //     senão, voltar 400 com msg

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

        return res.status(201).json({ message: 'Usuario criado com sucesso'});
    }
}

