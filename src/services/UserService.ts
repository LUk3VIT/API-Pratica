import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepositorio } from '../repositories/UserRepositorio';
import { UserAttributes } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'OlhaOlhaSo';

export class UserService {
    private userRepositorio: UserRepositorio;

    constructor() {
        this.userRepositorio = new UserRepositorio();
    }

    async cadastrarUsuario(userData: Omit<UserAttributes, 'id'>) {
        const existeUsuario = await this.userRepositorio.findByEmail(userData.email);
        if (existeUsuario) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.userRepositorio.create({
            ...userData,
            password: hashedPassword
        });
    }

    async loginUsuario(email: string, password: string) {
        const user = await this.userRepositorio.findByEmail(email);
        if (!user) {
            throw new Error('Crendencias invalidas');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Acesso não autorizado');
        }

        const token = jwt.sign(
            { userId: user.id, userName: user.userName },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return token;
    }
}

