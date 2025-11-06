import { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService";

export class ProdutoController {
  private produtoService: ProdutoService;

  constructor() {
    this.produtoService = new ProdutoService();
  }

async get(req: Request, res: Response): Promise<Response> {
  try {
    const produtos = await this.produtoService.getAllProdutos();
    return res.json(produtos);
  } catch (error: any) {
    return res.status(500).json({ error: "Erro interno do servidor", details: error.message });
  }
}


  async getByName(req: Request, res: Response): Promise<Response> {
    try {
      const name = req.params.name;
      const produto = await this.produtoService.getProdutoByName(name);
      if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
      return res.json(produto);
    } catch {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, preco } = req.body;
      const novoProduto = await this.produtoService.createProduto({ name, preco });
      return res.status(201).json(novoProduto);
    } catch (error: any) {
      if (error.message === "Produto já existe") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.params;
      const { newName, preco } = req.body;
      const produtoAtualizado = await this.produtoService.updateProduto(name, {
        name: newName || name,
        preco,
      });
      return res.json(produtoAtualizado);
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const name = req.params.name;
      const result = await this.produtoService.deleteProduto(name);
      return res.json(result);
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}