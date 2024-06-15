import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/channel/entity/channel.entity';
import { Repository } from 'typeorm';
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
    });
  }
}
