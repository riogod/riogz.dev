export interface IRequestUserListDto {
  page?: number;
  limit?: number;
}

export interface IResponseRoleDto {
  id: number;
  name: string;
  __entity: string;
}

export interface IResponseUserDto {
  id: number;
  email: string;
  provider: string;
  socialId: string | null;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  role: IResponseRoleDto[];
  status: {
    id: number;
    name: string;
    __entity: string;
  };
  __entity: string;
}

export interface IResponseUserListDto {
  data: IResponseUserDto[];
  hasNextPage: boolean;
}
