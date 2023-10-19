import { makeAutoObservable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { UserProjectsRepository } from "../repository/UserRepository.ts";
import { IProject } from "./interface.ts";

@injectable()
export class UserProjectsModel {
  _projectList: IProject[] = [];
  _loaded: boolean = false;

  get projectList() {
    return this._projectList;
  }

  get loaded() {
    return this._loaded;
  }

  set loaded(value: boolean) {
    this._loaded = value;
  }
  constructor(
    @inject(UserProjectsRepository)
    private userProjectsRepository: UserProjectsRepository,
  ) {
    makeAutoObservable(this);
  }

  async loadAllUserProjects() {
    const list = await this.userProjectsRepository.getAllUserProject();

    runInAction(() => {
      this._projectList = list;
    });
  }

  async createNewProject(name: string) {
    try {
      const item = await this.userProjectsRepository.createNewProject({ name });
      runInAction(() => {
        this._projectList.push(item);
      });
    } catch (error) {
      this._projectList.pop();
    }
  }

  dispose() {
    runInAction(() => {
      this._projectList = [];
    });
  }
}
