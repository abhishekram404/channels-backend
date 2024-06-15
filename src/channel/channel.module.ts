import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Channel } from './entity/channel.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, Workspace])],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
