import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

class UserController {

    private userRepository = getRepository(User);

    async all(req: Request, res: Response) {
        const users = this.userRepository.find();
        res.send(users);
    }

    async one(req: Request, res: Response) {
        const user = this.userRepository.findOne(req.params.id);
        res.send(user);
    }

    async save(req: Request, res: Response) {
        const user = this.userRepository.save(req.body);
        res.send(user);
    }

    async remove(req: Request, res: Response) {
        let userToRemove = await this.userRepository.findOne(req.params.id);
        await this.userRepository.remove(userToRemove);
        res.send(userToRemove);
    }

}

export const userController = new UserController();
