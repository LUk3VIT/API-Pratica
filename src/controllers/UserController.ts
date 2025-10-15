import { Request, Response } from "express";

interface User {
    id: number;
    name: string;
    email: string;
}

export class UserController{
    private users: User[] = [];
    private idCounter = 1;

    getAll(req: Request, res: Response): Response{
        return res.json(this.users);
    }

    getById(req: Request, res: Response): Response{
        const id = Number(req.params.id);
        const user = this.users.find(u => u.id === id)
        return user ? res.json(user) : res.status(404).json({message: "User not found"})
    }

    create (req: Request, res: Response): Response{
        const {name,email} = req.body;
        const newUser: User = {id: this.idCounter++, name, email}
        this.users.push(newUser);
        return res.status(201).json(newUser);
    }

    update (req: Request, res: Response): Response{
        const id = Number(req.params.id);
        const { name, email } = req.body;
        const user = this.users.find(u => u.id === id);
        if (!user) return res.status(404).json({message: "User not found"});
        
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        return res.json(user);
    }

    delete( req: Request, res: Response): Response{
        const id = Number(req.params.id);
        this.users = this.users.filter(u => u.id !== id)
        return res.status(204).send();
    }
}
 