import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { config } from './database/config';
import { ChatRoomsModule } from './modules/chat_rooms.module';
import { UsersModule } from './modules/users.module';
import { AuthGuard } from './providers/guards/auth.guard';
import { RolesGuard } from './providers/guards/roles.guard';
import { JwtService } from './providers/services/jwt.service';
import { RolesService } from './providers/services/roles.service';
import { UsersService } from './providers/services/users.service';
import { GuardUtil } from './providers/util/guard.util';
import { MessagesGateway } from './providers/gateways/messages.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, ChatRoomsModule],
  controllers: [AppController],
  providers: [
    UsersService,
    RolesService,
    JwtService,
    GuardUtil,
    MessagesGateway,
    { provide: APP_GUARD, useClass: AuthGuard }, // auth guard should come before roles guard
    { provide: APP_GUARD, useClass: RolesGuard }, // otherwise users won't be authenticated before roles check
  ],
})
export class AppModule {}