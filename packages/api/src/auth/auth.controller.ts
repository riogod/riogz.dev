import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions, Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { User } from '../users/entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { Response } from 'express';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() loginDto: AuthEmailLoginDto,
    @Request() request,
  ): Promise<LoginResponseType> {
    const deviceId = request.header('Device-Id');
    return this.service.validateLogin(loginDto, false, deviceId);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('admin/email/login')
  @HttpCode(HttpStatus.OK)
  public async adminLogin(
    @Body() loginDTO: AuthEmailLoginDto,
    @Request() request,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoginResponseType> {
    const deviceId = request.header('Device-Id');
    const data = await this.service.validateLogin(loginDTO, true, deviceId);

    response.cookie('accessToken', data.token, {
      maxAge: data.tokenExpires,
      httpOnly: false,
      secure: true,
      domain: '.riogz.dev'
    });
    response.cookie('refreshToken', data.refreshToken, {
      maxAge: data.refreshTokenExpires,
      httpOnly: true,
      secure: true,
      domain: '.riogz.dev'
    });
    return data;
  }

  @Post('email/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.service.register(createUserDto);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<void> {
    return this.service.confirmEmail(confirmEmailDto.hash);
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<void> {
    return this.service.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<NullableType<User>> {
    return this.service.me(request.user);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard(['jwt-refresh-cookie', 'jwt-refresh']))
  @HttpCode(HttpStatus.OK)
  public async refresh(@Request() request, @Res({ passthrough: true }) response: Response): Promise<Omit<LoginResponseType, 'user'>> {
    const deviceId = request.header('Device-Id');

    const data = await this.service.refreshToken({
      sessionId: request.user.sessionId,
    }, deviceId);

    response.cookie('accessToken', data.token, {
      maxAge: data.tokenExpires,
      httpOnly: false,
      secure: true,
      domain: '.riogz.dev',
    });
    response.cookie('refreshToken', data.refreshToken, {
      maxAge: data.refreshTokenExpires * 1000,
      httpOnly: true,
      secure: true,
      domain: '.riogz.dev',
    });

    return data;
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() request): Promise<void> {
    await this.service.logout({
      sessionId: request.user.sessionId,
    });
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @HttpCode(HttpStatus.OK)
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard(['jwt-cookie', 'jwt']))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() request): Promise<void> {
    return this.service.softDelete(request.user);
  }


}
