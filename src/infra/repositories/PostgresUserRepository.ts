import { v4 as uuidv4 } from "uuid";
import User from "@/app/domain/entities/User";
import UserRepository from "@/app/repositories/UserRepository";
import UserModel, { UserEvent, UserRole } from "@/infra/models/User";

export default class PostgresUserRepository implements UserRepository {

    async create(data: Object): Promise<User> {
        const uuid = uuidv4();

        const user = UserModel.create({
            uuid,
            firstName: data['firstName'],
            lastName: data['lastName'],
            email: data['email'],
            phoneNumber: data['phoneNumber'],
            password: data['password'],
            role: UserRole.CLIENT,
            creationDate: new Date(),
            currentEvent: UserEvent.CREATION,
        });

        return await user.save();
    }

    async all(): Promise<User[]> {
        const users = await UserModel.find();
        return users;
    }

    async findOne(userId: string): Promise<User> {
        const user = await UserModel.findOne({ uuid: userId });
        return user;
    }
}