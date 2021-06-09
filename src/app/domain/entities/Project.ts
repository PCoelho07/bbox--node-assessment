import User from "@/app/domain/entities/User";

export default class Project {
    user: User;
    description: string;

    constructor(user: User, description: string) {
        this.user = user;
        this.description = description;
    }
}
