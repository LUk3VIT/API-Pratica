import { User, UserAttributes } from "../models/User";

export class UserRepositorio {

    async findByUser(userName: string): Promise<User | null> {
        return await User.findOne({ where: { userName } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async create(userData: Omit<UserAttributes, 'id'>): Promise<User> {
        return await User.create(userData);
    }
}