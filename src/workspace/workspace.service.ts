import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entity/workspace.entity';
import { Repository } from 'typeorm';
import { Channel } from 'src/channel/entity/channel.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async create(payload) {
    const defaultChannel = new Channel();
    defaultChannel.name = 'default';

    const workspace = new Workspace();
    workspace.name = payload.name;
    workspace.code = payload.code;
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
