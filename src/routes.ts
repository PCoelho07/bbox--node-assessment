import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from "uuid";
import Project from "@/infra/models/Project";
import User, { UserEvent, UserRole } from "@/infra/models/User";
import PostgresUserRepository from '@/infra/repositories/PostgresUserRepository';
import RegisterUser from '@/app/usecases/RegisterUser';
import ListAllUsers from '@/app/usecases/ListAllUsers';

interface CustomRequest<T> extends Request {
    body: T;
}

interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

interface ProjectRequestBody {
    userId: string;
    description: string;
}

const router = Router()

router.post(
    "/users",
    async ({ body }: CustomRequest<UserInput>, res: Response) => {

      const registerUserUseCase = new RegisterUser(
        new PostgresUserRepository()
      );

      const user = await registerUserUseCase.handle(body)

      res.status(201).json({ email: user.email });
    }
  );

  router.get("/users", async (req: Request, res: Response) => {

    const listAllUsersUseCase = new ListAllUsers(
      new PostgresUserRepository()
    );

    const users = await listAllUsersUseCase.handle()

    res.status(200).json(users);

  });

  router.get("/users/:id", async (req: Request, res: Response) => {
    const repository = new PostgresUserRepository()
    const user = await repository.findOne(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else res.status(404).json({ message: "User not found!" });

  });

  router.delete("/users/:id", async (req: Request, res: Response) => {
    const user: User = await User.findOne({ uuid: req.params.id });
    if (user) {
      User.delete(user);
      res.sendStatus(204);
    } else res.status(404).json({ message: "User not found!" });
  });

  router.post(
    "projects",
    async ({ body }: CustomRequest<ProjectRequestBody>, res: Response) => {
      const uuid = uuidv4();
      const user: User = await User.findOne({ uuid: body.userId });
      const project: Project = Project.create({
        uuid,
        description: body.description,
        owner: user,
        creationDate: new Date(),
      });
      await project.save();
      res.status(201).json({ id: uuid });
    }
  );

  router.get("/projects", async (req: Request, res: Response) => {
    const { userId } = req.query;
    let projects: Project[];
    if (userId) projects = await Project.find({where: { owner: userId }});
    else projects = await Project.find();
    res.status(200).json(projects);
  });

  router.get("/projects/:projectId", async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const projects: Project = await Project.findOne({
      where: { uuid: projectId },
    });
    res.status(200).json(projects);
  });

  router.delete("/projects/:projectId", async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project: Project = await Project.findOne({
      where: { uuid: projectId },
    });
    if (project) {
      Project.delete(project);
      res.sendStatus(204);
    } else res.status(404).json({ message: "User not found!" });
  });

export default router;


