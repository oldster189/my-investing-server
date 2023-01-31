import { Expose } from 'class-transformer'

export class SuggestionStock {
  @Expose()
  symbol: string

  @Expose()
  company: string

  @Expose()
  exchange: string
}
