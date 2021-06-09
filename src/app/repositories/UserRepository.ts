import User from "@/app/domain/entities/User";

export default interface UserRepository {
    create(data): Promise<User>;
    all(): Promise<User[]>;
    findOne(userId: string): Promise<User>;
}