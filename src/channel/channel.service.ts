import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelListener } from 'diagnostics_channel';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './entity/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<ChannelListener>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(payload: CreateChannelDto) {
    const { name, workspaceId } = payload;

    const doesWorkspaceExist = await this.workspaceRepository.existsBy({
      id: workspaceId,
    });

    if (!doesWorkspaceExist)
      throw new BadRequestException('No workspace exists with given ID.');

    const newChannel = this.channelRepository.create({
      name,
      workspace: workspaceId,
    });

    return this.channelRepository.save(newChannel);
  }

  findAll() {
    return this.channelRepository.find({
      order: {
        updatedAt: 'desc',
      },
    });
  }
}
