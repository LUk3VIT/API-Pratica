import { Produto, ProdutoAttributes } from "../models/Produto";

export class ProdutoRepositorio {
    
    async findall(): Promise<Produto[]> {
        return Produto.findAll();
    }

    async findByName(name: string): Promise<Produto | null> {
        return Produto.findOne({ where: {name} });
    }

    async create (produtoData: Omit<ProdutoAttributes, 'id'>): Promise<Produto> {
        return await Produto.create(produtoData);
    }

    async update(name: string, produtoData: Partial<ProdutoAttributes>): Promise<Produto | null> {
        const produto = await this.findByName(name);
        if (!produto) return null;

        await produto.update(produtoData);
        return produto;
    }
    
    async delete(name: string): Promise<boolean> {
        const resut = await Produto.destroy({ where: { name } });
        return resut > 0;
    }
}