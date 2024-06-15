import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelListener } from 'diagnostics_channel';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './entity/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<ChannelListener>,
  ) {}

  create(payload: CreateChannelDto) {
    const newChannel = this.channelRepository.create({
      name: payload.name,
      workspace: payload.workspaceId,
    });

    return this.channelRepository.save(newChannel);
  }

  findAll() {
    return this.channelRepository.find();
  }
}
