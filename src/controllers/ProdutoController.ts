import { Request, Response } from "express";

interface Produto {
    id: number;
    name: string;
    tipo: string;

}

export class ProdutoController{
    private prod: Produto[] = [];
    private idCounter = 1;

    getAll(req: Request, res: Response): Response{
        return res.json(this.prod);
    }

    getById(req: Request, res: Response): Response{
        const id = Number(req.params.id);
        const user = this.prod.find(p => p.id === id)
        return user ? res.json(user) : res.status(404).json({message: "Produto not found"})
    }

    create (req: Request, res: Response): Response{
        const {name,tipo} = req.body;
        const newUser: Produto = {id: this.idCounter++, name, tipo};
        this.prod.push(newUser);
        return res.status(201).json(newUser);
    }

    update (req: Request, res: Response): Response{
        const id = Number(req.params.id);
        const { name, email } = req.body;
        const user = this.prod.find(u => u.id === id);
        if (!user) return res.status(404).json({message: "Produto not found"});
        
        user.name = name ?? user.name;
        user.tipo = email ?? user.tipo;
        return res.json(user);
    }

    delete( req: Request, res: Response): Response{
        const id = Number(req.params.id);
        this.prod = this.prod.filter(p => p.id !== id)
        return res.status(204).send();
    }
}
 