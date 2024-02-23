import { UserService } from './user.service';
import { Response } from 'express';
import { RegisterDTO } from './dto/register.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: RegisterDTO): any;
    login(body: any, res: Response): Promise<void>;
    get(value: any, id: any): any;
}
