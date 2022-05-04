import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { JwtStrategy } from './strategy';

@Module({
    imports: [JwtModule.register({})],
    providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}
