import UserRepository from "../repositories/UserRepository";

export default class ListAllUsers {

    constructor(readonly repository: UserRepository) {
        this.repository = repository;
    }


    async handle() {

        // Do some whatever logic

        return await this.repository.all();
    }
}