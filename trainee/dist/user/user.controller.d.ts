import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getOneUser(id: any): Promise<User>;
    createUser(createUserDto: createUserDto): Promise<User>;
    deleteUser(id: any): Promise<User>;
    updateUser(updateUserDto: updateUserDto, id: any): Promise<User>;
}
