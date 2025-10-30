import { Request, Response } from "express";
import { ProdutoService } from '../services/ProdutoService';


export class ProdutoController{
    private produtoService: ProdutoService;

    constructor() {
        this.produtoService = new ProdutoService();
    }
    

    async get (req: Request, res: Response): Promise<Response>{
        try {
            const produtos = await this.produtoService.getAllProdutos();
            return res.json(produtos)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }
    }

    
    async getByName(req: Request, res: Response): Promise<Response>{
        try {
            const name = req.params.name;
            const produto = await this.produtoService.getProdutoByName(name);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            return res.json(produto);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }
        
    }


    async create (req: Request, res: Response): Promise<Response>{
        try{
            const {name, tipo} = req.body;
            const novoPrduto = await this.produtoService.createProduto({name, tipo});
            return res.status(201).json(novoPrduto);
        } catch(error: any) {
            if (error.message === 'name já existe') {
                return res.status(400).json({ error: error.message});
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async update (req: Request, res: Response): Promise<Response>{
        try {
            const { nameInden } = req.params;
            const { name, tipo } = req.body;
            const produtoUpdata = await this.produtoService.updateProduto(nameInden, {name, tipo});
            return res.json(produtoUpdata)
        }   catch (error: any) {
            if (error.message == 'Produto não encontrado') {
                return res.status(404).json({error: error.message});
            }
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }
    }

    
    async delete( req: Request, res: Response): Promise<Response>{
        try {
            const name = req.params.name;
            const result = await this.produtoService.deleteProduto(name);
            return res.json(result);
        } catch (error: any) {
            if (error.message === 'Produto não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

}
 