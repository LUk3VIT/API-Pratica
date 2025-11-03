import { Auth, AuthAttributes } from "../models/Auth";

export class AuthRepositorio {

    async findByEmail(email: string): Promise<Auth | null> {
        return await Auth.findOne({ where: { email } });
    }

    async findById(id: number): Promise<Auth | null> {
        return await Auth.findByPk(id);
    }
    
    async create(produtoData: Omit<AuthAttributes, 'id'>): Promise<Auth> {
        return await Auth.create(produtoData);
    }
}