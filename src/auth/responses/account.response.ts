import { Expose, Type } from 'class-transformer'

export class AccountResponse {
  @Expose()
  email: string

  @Expose()
  dbname: string

  @Expose()
  image: string

  @Expose()
  firstName: string

  @Expose()
  lastName: string

  @Expose()
  sex: string

  @Expose()
  phoneNumber: string
}

export class CurrencyListResponse {
  @Expose()
  @Type(() => AccountResponse)
  data: AccountResponse[]
}
