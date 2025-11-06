import { ProdutoRepositorio } from "../repositories/ProdutoRepositorio";
import { ProdutoAttributes } from "../models/Produto";

export class ProdutoService {
  private produtoRepositorio: ProdutoRepositorio;

  constructor() {
    this.produtoRepositorio = new ProdutoRepositorio();
  }

  async getAllProdutos(): Promise<ProdutoAttributes[]> {
    return await this.produtoRepositorio.findAll();
  }

  async getProdutoByName(name: string): Promise<ProdutoAttributes | null> {
    return await this.produtoRepositorio.findByName(name);
  }

  async createProduto(produtoData: Omit<ProdutoAttributes, "id">) {
    const existProduto = await this.produtoRepositorio.findByName(produtoData.name);
    if (existProduto) {
      throw new Error("Produto já existe");
    }
    return await this.produtoRepositorio.create(produtoData);
  }

  async updateProduto(name: string, produtoData: Partial<ProdutoAttributes>) {
    const produto = await this.produtoRepositorio.update(name, produtoData);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }
    return produto;
  }

  async deleteProduto(name: string) {
    const deleted = await this.produtoRepositorio.delete(name);
    if (!deleted) {
      throw new Error("Produto não encontrado");
    }
    return { message: "Produto removido com sucesso" };
  }
}