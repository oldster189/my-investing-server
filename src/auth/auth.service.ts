import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { modelMapper } from 'src/utils/mapper.util'
import { CreateAccountRequest } from './requests/create-account.request'
import { AccountResponse } from './responses/account.response'
import { Account, AccountDocument } from './schemas/account.schema'
import { SignInRequest } from './requests/sign-in.request'

@Injectable()
export class AuthService {
  constructor(@InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>) {}

  async get(email: string): Promise<AccountResponse> {
    const account = await this.accountModel.findOne({ email })
    if (!account) throw new NotFoundException('account not found')

    return modelMapper(AccountResponse, account)
  }

  async validateUser(signInRequest: SignInRequest): Promise<void> {
    const { email, password } = signInRequest

    const account = await this.accountModel.findOne({ email })
    if (!account) throw new BadRequestException('Incorrect email or password, please check and try again')

    const isValid = await bcrypt.compare(password, account.password)
    if (!isValid) throw new BadRequestException('Incorrect email or password, please check and try again')
  }

  async signin(signInRequest: SignInRequest): Promise<AccountResponse> {
    const { email } = signInRequest

    await this.validateUser(signInRequest)

    return this.get(email)
  }

  async createNewAccount(createRequest: CreateAccountRequest): Promise<AccountResponse> {
    const { email, password } = createRequest

    const isEmailExist = await this.accountModel.exists({ email })
    if (isEmailExist) throw new HttpException({ message: 'This email is already in use.' }, HttpStatus.CONFLICT)

    const dbname = String(new Date().getTime())
    const hashPassword = await bcrypt.hash(password, 10)
    const newCreateRequest: CreateAccountRequest = {
      ...createRequest,
      password: hashPassword,
      dbname,
    }

    const newAccount = await new this.accountModel(newCreateRequest).save()

    return modelMapper(AccountResponse, newAccount)
  }
}
