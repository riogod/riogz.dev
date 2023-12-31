import { makeAutoObservable } from "mobx";
import { inject, injectable } from "inversify";
import { UserListModel } from "../model/user.list.model.ts";
import { IRequestUserListDto } from "../repository/interface.ts";

@injectable()
export class UsersViewModel {
  get userList() {
    return this.userListModel.userList;
  }
  constructor(
    @inject(UserListModel)
    private userListModel: UserListModel,
  ) {
    makeAutoObservable(this);
  }

  async loadAllUsers(params: IRequestUserListDto) {
    await this.userListModel.loadAllUsers(params);
  }

  dispose() {
    this.userListModel.dispose();
    console.log(this.userListModel.userList);
  }
}
