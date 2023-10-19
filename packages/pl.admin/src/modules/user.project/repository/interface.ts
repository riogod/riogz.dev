export interface IResponseUserProjectsDto {
  id: number;
  name: string;
  description: string;
}

export interface IRequestUserProjectsDto {
  name: string;
  description?: string;
}
