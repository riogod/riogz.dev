export interface RequestAuthDTO {
  email: string;
  password: string;
}

export interface ResponseLoginServiceDTO {
  accessToken: string;
  refreshToken: string;
  user: {
        id: number,
        name: string,
        email: string
    }
}