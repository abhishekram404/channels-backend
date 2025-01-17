import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/channel/entity/channel.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from './entity/workspace.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async create(payload: CreateWorkspaceDto): Promise<Workspace> {
    const defaultChannel = new Channel();
    defaultChannel.name = 'default';

    const workspace = new Workspace();
    workspace.name = payload.name;
    workspace.logoUrl = payload.logoUrl;
    workspace.channels = [defaultChannel];

    return this.workspaceRepository.save(workspace);
  }

  async findAll() {
    return this.workspaceRepository.find({
      relations: {
        channels: true,
      },
      order: {
        updatedAt: 'desc',
      },
    });
  }

  async findOneBy(
    findOptions: FindOptionsWhere<Workspace> | FindOptionsWhere<Workspace>[],
  ) {
    return this.workspaceRepository.findOneBy(findOptions);
  }

  async findWorkspaceChannels(workspaceId: number) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
      relations: {
        channels: true,
      },
    });

    if (!workspace)
      throw new BadRequestException('No workspace exists with the given ID.');

    return workspace.channels;
  }
}
