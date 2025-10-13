import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'generated/prisma';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { CookieService } from './cookie.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response) {
    const { access_token, user: currentUser } = this.authService.login(user);

    this.cookieService.setAuthCookies(res, access_token, currentUser);

    return { ...currentUser };
  }

  @Post('/register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user: currentUser } =
      await this.authService.register(dto);

    this.cookieService.setAuthCookies(res, access_token, currentUser);

    return { ...currentUser };
  }
}
