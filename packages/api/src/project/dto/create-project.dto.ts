import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateProjectDto {
  @ApiProperty({ example: 'My project' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'My project description' })
  description: string | null;
}
