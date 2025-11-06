import { Produto, ProdutoAttributes } from "../models/Produto";

export class ProdutoRepositorio {
async findAll(): Promise<Produto[]> {
  try {
    return await Produto.findAll();
  } catch (error) {
    console.error("Erro ao buscar produtos no banco:", error);
    throw error;
  }
}

  async findByName(name: string): Promise<Produto | null> {
    return await Produto.findOne({ where: { name } });
  }

  async create(produtoData: Omit<ProdutoAttributes, "id">): Promise<Produto> {
    return await Produto.create(produtoData);
  }

  async update(name: string, produtoData: Partial<ProdutoAttributes>): Promise<Produto | null> {
    const produto = await this.findByName(name);
    if (!produto) return null;

    await produto.update(produtoData);
    return produto;
  }

  async delete(name: string): Promise<boolean> {
    const result = await Produto.destroy({ where: { name } });
    return result > 0;
  }
}