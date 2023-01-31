import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateAccountRequest {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsOptional()
  dbname: string

  @IsOptional()
  image: string

  @IsOptional()
  firstName: string

  @IsOptional()
  lastName: string

  @IsOptional()
  sex: string

  @IsOptional()
  phoneNumber: string
}

export class UpdateAccountRequest extends PartialType(CreateAccountRequest) {
  @IsNotEmpty()
  _id: string
}
