import { Request, Response } from "express";
import { AuthService } from '../services/AuthService';


export class AuthController {
    private authService: AuthService;


    constructor() {
        this.authService = new AuthService();
    }

    async register (req: Request, res: Response): Promise<Response> {

        try{ 
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({message: 'Todos os campos são obrigatórios'})
            }
            const result = await this.authService.register({ name, email, password})
            return res.status(201).json(result);
        } catch (error: any) {
            if (error.message === 'Email já cadastrado') {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async login(req: Request, res: Response): Promise<Response>{

        try {
            const { email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios'})
            }

            const result = await this.authService.login(email, password);
            return res.json(result)
        } catch (error: any) {
            if (error.message === 'Credenciais inválidas' || error.message === 'Acesso não autorizado') {
                return res.status(401).json({message: error.message});
            }

            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}


