import Project from "@/app/domain/entities/Project";

export default interface ProjectRepository {
    create(): Promise<Project>;
    find(): Promise<Project[]>;
    findOne(): Promise<Project>;
    delete(): Promise<boolean>;
}