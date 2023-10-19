import { makeAutoObservable } from "mobx";
import { inject, injectable } from "inversify";
import { UserProjectsModel } from "../model/projects.model.ts";
import { IProject } from "../model/interface.ts";

@injectable()
export class UserProjectsViewModel {
  get list(): IProject[] {
    return this.userProjectsListModel.projectList;
  }

  get loaded(): boolean {
    return this.userProjectsListModel.loaded;
  }
  constructor(
    @inject(UserProjectsModel)
    private userProjectsListModel: UserProjectsModel,
  ) {
    makeAutoObservable(this);
  }

  async loadAllProjects() {
    await this.userProjectsListModel.loadAllUserProjects();
  }

  setLoaded(value: boolean) {
    this.userProjectsListModel.loaded = value;
  }

  async create(name: string) {
    await this.userProjectsListModel.createNewProject(name);
  }
  dispose() {
    this.userProjectsListModel.dispose();
  }
}
