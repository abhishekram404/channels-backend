import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelListener } from 'diagnostics_channel';
import { Repository } from 'typeorm';
import { Channel } from './entity/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<ChannelListener>,
  ) {}
}
