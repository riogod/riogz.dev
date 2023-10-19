import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  getList(userJwtPayload: JwtPayloadType): Promise<Project[]> {
    return this.projectRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userJwtPayload.id,
        },
      },
    });
  }

  getById(userJwtPayload: JwtPayloadType, id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userJwtPayload.id,
        },
        id,
      },
    });
  }

  create(
    userJwtPayload: JwtPayloadType,
    createDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectRepository.save(
      this.projectRepository.create({
        ...createDto,
        user: userJwtPayload,
      }),
    );
  }

  update(
    userJwtPayload: JwtPayloadType,
    id: number,
    createDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectRepository.save({
      ...createDto,
      where: {
        id,
        user: {
          id: userJwtPayload.id,
        },
      },
    });
  }
  //
  delete(userJwtPayload: JwtPayloadType, id: number): Promise<DeleteResult> {
    return this.projectRepository.delete({
      id,
      user: {
        id: userJwtPayload.id,
      },
    });
  }
}
