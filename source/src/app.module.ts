import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './Auth.guard';
import { PermissionsGuard } from './Permissions.guard';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: '12345', // Secret Key
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ItemsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule { }
