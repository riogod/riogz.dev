export interface IUserRole {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  provider: string;
  socialId: string | null;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  role: IUserRole[];
  status: {
    id: number;
    name: string;
  };
}
