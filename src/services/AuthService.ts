import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepositorio } from '../repositories/AuthRepositorio';
import { AuthAttributes } from '../models/Auth';

const JWT_SECRET = process.env.JWT_SECRET || 'OlhaOlhaSo';

export class AuthService {
  private authRepository: AuthRepositorio;

  constructor() {
    this.authRepository = new AuthRepositorio();
  }

  async register(AuthData: Omit<AuthAttributes, 'id'>) {
    const existeAuth = await this.authRepository.findByEmail(AuthData.email);
    if (existeAuth) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(AuthData.password, 10);
    const user = await this.authRepository.create({
      ...AuthData,
      password: hashedPassword,
    });

    return { message: "Usuário cadastrado com sucesso", user: { id: user.id, name: user.name, email: user.email } };
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email e/ou senha inválidos');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Acesso não autorizado');
    }

    const token = jwt.sign(
      { userId: user.id, userName: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token };
  }
}