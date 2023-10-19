import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('User Projects')
@Controller({
  path: 'project',
  version: '1',
})
@Controller('project')
export class ProjectController {
  constructor(private service: ProjectService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @Get('')
  @HttpCode(HttpStatus.OK)
  listUserProjects(@Request() request) {
    return this.service.getList(request.user);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProject(@Request() request) {
    return this.service.getById(request.user, request.params.id);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createProjectDto: CreateProjectDto, @Request() request) {
    return this.service.create(request.user, createProjectDto);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateProject(@Request() request) {
    return this.service.update(request.user, request.params.id, request.body);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  removeProject(@Request() request) {
    return this.service.delete(request.user, request.params.id);
  }
}
