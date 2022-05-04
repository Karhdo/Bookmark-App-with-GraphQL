import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { AuthService } from './auth.service';
import { GetCurrent } from './decorator';
import { AuthLoginInput } from './dto/input/auth-login.input';
import { AuthRegisterInput } from './dto/input/auth-register.input';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { Tokens } from './models/auth.model';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => Tokens, { name: 'login' })
    login(@Args('authLoginData') data: AuthLoginInput): Promise<Tokens> {
        return this.authService.login(data);
    }

    @Mutation(() => User)
    register(@Args('authRegisterData') data: AuthRegisterInput): Promise<User> {
        return this.authService.register(data);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Tokens, { name: 'refreshToken' })
    refreshToken(@GetCurrent() user: User): Promise<Tokens> {
        return this.authService.refreshToken(user);
    }
}
