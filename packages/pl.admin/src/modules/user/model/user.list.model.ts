import { makeAutoObservable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { UsersRepository } from "../repository/UserRepository.ts";
import { IUser } from "./interface.ts";
import { IRequestUserListDto } from "../repository/interface.ts";

@injectable()
export class UserListModel {
  _userList: IUser[] = [];
  _page = 1;
  _limit = 25;

  get userList() {
    return this._userList;
  }
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    makeAutoObservable(this);
  }

  async loadAllUsers(params: IRequestUserListDto) {
    const list = await this.usersRepository.getAllUsers(params);
    runInAction(() => {
      this._userList = list.data;
    });
  }

  dispose() {
    runInAction(() => {
      this._userList = [];
    });
  }
}
