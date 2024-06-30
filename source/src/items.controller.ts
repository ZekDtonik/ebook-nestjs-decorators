import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './Auth.guard';
import { Permissions } from './Permission.decorator';
import { PermissionsGuard } from './Permissions.guard';

@Controller('items')
@UseGuards(AuthGuard, PermissionsGuard)
export class ItemsController {
  
  @Get()
  @Permissions('view_items')
  findAll() {
    return 'This action return all items.';
  }
}
