import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  findAll() {
    return this.workspaceService.findAll();
  }

  @Post()
  create(@Body() payload: CreateWorkspaceDto) {
    return this.workspaceService.create(payload);
  }

  @Get(':workspaceId')
  findOne(@Param('workspaceId') workspaceId: number) {
    return this.workspaceService.findOneBy({
      id: workspaceId,
    });
  }

  @Get(':workspaceId/channels')
  findChannels(@Param('workspaceId') workspaceId: number) {
    return this.workspaceService.findWorkspaceChannels(workspaceId);
  }
}
