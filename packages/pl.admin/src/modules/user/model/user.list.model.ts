import { makeAutoObservable } from "mobx";
import { inject, injectable } from "inversify";
import { UsersRepository } from "../repository/UserRepository.ts";
import { IUser } from "./interface.ts";
import { IRequestUserListDto } from "../repository/interface.ts";

@injectable()
export class UserListModel {
  userList: IUser[] = [];
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    makeAutoObservable(this);
  }

  async loadAllUsers(params: IRequestUserListDto) {
    const list = await this.usersRepository.getAllUsers(params);
    this.userList.push(...list.data);
  }

  dispose() {
    this.userList = [];
  }
}
