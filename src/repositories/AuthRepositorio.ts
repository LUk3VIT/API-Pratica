import { Auth, AuthAttributes } from "../models/Auth";

export class AuthRepositorio {

    async findByEmail(email: string): Promise<Auth | null> {
        return await Auth.findOne({ where: { email } });
    }

    async findById(id: number): Promise<AuthAttributes | null> {
        return await Auth.findByPk(id);
    }
    
    async create(userData: Omit<AuthAttributes, 'id'>): Promise<Auth> {
        return await Auth.create(userData);
    }
}