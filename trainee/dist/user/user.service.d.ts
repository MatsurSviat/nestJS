import { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User, userDocument } from './schemas/user.schema';
export declare class UserService {
    private UserModal;
    constructor(UserModal: Model<userDocument>);
    getAllUsers(): Promise<User[]>;
    getOneUser(id: any): Promise<User>;
    createUser(userDto: createUserDto): Promise<User>;
    removeUser(id: any): Promise<User>;
    updateUser(id: any, userDto: updateUserDto): Promise<User>;
}
