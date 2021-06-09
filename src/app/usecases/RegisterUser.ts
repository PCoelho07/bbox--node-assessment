import User from "../domain/entities/User";
import UserRepository from "../repositories/UserRepository";

interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export default class RegisterUser {
    constructor(readonly repository: UserRepository) {
        this.repository = repository;
    }

    async handle(data: UserInput) {
        const user = new User(data.firstName, data.lastName, data.email, data.phoneNumber, data.password);

        return await this.repository.create(user);
    }
}