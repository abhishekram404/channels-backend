import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async findAll() {
    return this.channelService.findAll();
  }

  @Post()
  async create(@Body() body: CreateChannelDto) {
    return this.channelService.create(body);
  }
}
