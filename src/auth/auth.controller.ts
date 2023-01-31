import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAccountRequest } from './requests/create-account.request'
import { SignInRequest } from './requests/sign-in.request'
import { AccountResponse } from './responses/account.response'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() request: SignInRequest): Promise<AccountResponse> {
    return this.authService.signin(request)
  }

  @Post('signup')
  create(@Body() createRequest: CreateAccountRequest): Promise<AccountResponse> {
    return this.authService.createNewAccount(createRequest)
  }
}
