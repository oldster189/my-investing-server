import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { modelMapper } from 'src/utils/mapper.util'
import { CreateTransactionRequest, UpdateTransactionRequest } from './requests/create-transaction.request'
import { TransactionListResponse, TransactionResponse } from './responses/transaction.response'
import { Transaction, TransactionDocument } from './schemas/transaction.schema'
import { ExchangesService } from 'src/exchanges/exchanges.service'
import { StocksService } from 'src/stocks/stocks.service'
import { TransactionType } from 'src/shared/enums/transaction-type.enum'
import * as dayjs from 'dayjs'
import { UpdateStocksRequest } from 'src/stocks/requests/create-stocks.request'
import { ExchangeQuery } from 'src/exchanges/requests/query-exchange.request'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    private readonly exchangesService: ExchangesService,
    private readonly stocksService: StocksService,
  ) {}

  async get(id: string): Promise<TransactionResponse> {
    const item = await this.transactionModel.findById(id)
    return modelMapper(TransactionResponse, item)
  }

  async getAll(): Promise<TransactionResponse[]> {
    const list = await this.transactionModel.find()
    return modelMapper(TransactionListResponse, { data: list }).data
  }

  async getAllBySymbol(symbol: string): Promise<TransactionResponse[]> {
    const list = await this.transactionModel.find({ symbol })
    return modelMapper(TransactionListResponse, { data: list }).data
  }

  async getAllByPortfolioId(portfolioId: string): Promise<TransactionResponse[]> {
    const list = await this.transactionModel.find({ portfolioId })
    return modelMapper(TransactionListResponse, { data: list }).data
  }

  async create(createRequest: CreateTransactionRequest): Promise<TransactionResponse> {
    const newItem = await new this.transactionModel(createRequest).save()
    return this.get(String(newItem._id))
  }

  priceHistories = [
    {
      id: '994600585',
      type: 'historical_price',
      attributes: {
        open: 391.77,
        close: 386.25,
        high: 392.0,
        low: 384.95,
        volume: 7292193.0,
        div_adj_factor: 0.9884610873786408,
        as_of_date: '2022-11-01',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '997995271',
      type: 'historical_price',
      attributes: {
        open: 385.58,
        close: 376.35,
        high: 390.21,
        low: 376.22,
        volume: 6806076.0,
        div_adj_factor: 0.988461086754351,
        as_of_date: '2022-11-02',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1001035701',
      type: 'historical_price',
      attributes: {
        open: 372.94,
        close: 372.57,
        high: 375.69,
        low: 370.31,
        volume: 3496775.0,
        div_adj_factor: 0.9884610865072335,
        as_of_date: '2022-11-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1003945774',
      type: 'historical_price',
      attributes: {
        open: 378.51,
        close: 377.84,
        high: 380.4,
        low: 371.53,
        volume: 4572684.0,
        div_adj_factor: 0.9884610867033666,
        as_of_date: '2022-11-04',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1010894070',
      type: 'historical_price',
      attributes: {
        open: 379.27,
        close: 381.53,
        high: 382.14,
        low: 377.08,
        volume: 3778154.0,
        div_adj_factor: 0.9884610856289153,
        as_of_date: '2022-11-07',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1060204934',
      type: 'historical_price',
      attributes: {
        open: 382.68,
        close: 383.6,
        high: 386.68,
        low: 379.2701,
        volume: 3781161.0,
        div_adj_factor: 0.9884610870698644,
        as_of_date: '2022-11-08',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1145970125',
      type: 'historical_price',
      attributes: {
        open: 381.43,
        close: 375.77,
        high: 382.71,
        low: 375.18,
        volume: 8459078.0,
        div_adj_factor: 0.9884610852383108,
        as_of_date: '2022-11-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1188841852',
      type: 'historical_price',
      attributes: {
        open: 389.63,
        close: 396.35,
        high: 396.7,
        low: 387.27,
        volume: 4527284.0,
        div_adj_factor: 0.9884610874227323,
        as_of_date: '2022-11-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1248058456',
      type: 'historical_price',
      attributes: {
        open: 397.34,
        close: 400.17,
        high: 401.06,
        low: 395.11,
        volume: 3746343.0,
        div_adj_factor: 0.9884610865382213,
        as_of_date: '2022-11-11',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1251616328',
      type: 'historical_price',
      attributes: {
        open: 398.36,
        close: 396.81,
        high: 401.905,
        low: 396.58,
        volume: 6093933.0,
        div_adj_factor: 0.9884610871701822,
        as_of_date: '2022-11-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1253918708',
      type: 'historical_price',
      attributes: {
        open: 402.9,
        close: 400.18,
        high: 404.03,
        low: 396.2,
        volume: 6157269.0,
        div_adj_factor: 0.9884610850117448,
        as_of_date: '2022-11-15',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1255235429',
      type: 'historical_price',
      attributes: {
        open: 398.45,
        close: 397.24,
        high: 399.45,
        low: 396.49,
        volume: 4086712.0,
        div_adj_factor: 0.9884610864968281,
        as_of_date: '2022-11-16',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1256753173',
      type: 'historical_price',
      attributes: {
        open: 392.21,
        close: 395.9,
        high: 396.65,
        low: 391.81,
        volume: 3341881.0,
        div_adj_factor: 0.9884610861328619,
        as_of_date: '2022-11-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1258364224',
      type: 'historical_price',
      attributes: {
        open: 399.44,
        close: 397.78,
        high: 399.5,
        low: 394.73,
        volume: 2504927.0,
        div_adj_factor: 0.9884610865302429,
        as_of_date: '2022-11-18',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1260941324',
      type: 'historical_price',
      attributes: {
        open: 396.38,
        close: 396.26,
        high: 397.47,
        low: 394.39,
        volume: 2302751.0,
        div_adj_factor: 0.9884610861555545,
        as_of_date: '2022-11-21',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1262590098',
      type: 'historical_price',
      attributes: {
        open: 398.33,
        close: 401.72,
        high: 401.81,
        low: 396.88,
        volume: 3314591.0,
        div_adj_factor: 0.9884610873245046,
        as_of_date: '2022-11-22',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1309895895',
      type: 'historical_price',
      attributes: {
        open: 401.27,
        close: 404.12,
        high: 404.69,
        low: 401.11,
        volume: 2267636.0,
        div_adj_factor: 0.9884610858160942,
        as_of_date: '2022-11-23',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1346812688',
      type: 'historical_price',
      attributes: {
        open: 403.61,
        close: 404.09,
        high: 404.69,
        low: 403.33,
        volume: 1202538.0,
        div_adj_factor: 0.9884610854017669,
        as_of_date: '2022-11-25',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1348633516',
      type: 'historical_price',
      attributes: {
        open: 400.8301,
        close: 397.69,
        high: 402.56,
        low: 396.8225,
        volume: 2508442.0,
        div_adj_factor: 0.9884610852674194,
        as_of_date: '2022-11-28',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1350251513',
      type: 'historical_price',
      attributes: {
        open: 397.76,
        close: 397.01,
        high: 399.03,
        low: 395.0,
        volume: 4447838.0,
        div_adj_factor: 0.9884610866225033,
        as_of_date: '2022-11-29',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1352342564',
      type: 'historical_price',
      attributes: {
        open: 397.21,
        close: 409.32,
        high: 409.32,
        low: 395.19,
        volume: 6014823.0,
        div_adj_factor: 0.9884610866803479,
        as_of_date: '2022-11-30',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1354552813',
      type: 'historical_price',
      attributes: {
        open: 410.68,
        close: 409.15,
        high: 411.94,
        low: 406.53,
        volume: 5897931.0,
        div_adj_factor: 0.9884610851765857,
        as_of_date: '2022-12-01',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1356595758',
      type: 'historical_price',
      attributes: {
        open: 403.95,
        close: 408.71,
        high: 409.65,
        low: 403.95,
        volume: 3624204.0,
        div_adj_factor: 0.9884610873235301,
        as_of_date: '2022-12-02',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1358515559',
      type: 'historical_price',
      attributes: {
        open: 405.73,
        close: 401.35,
        high: 406.72,
        low: 399.93,
        volume: 4140985.0,
        div_adj_factor: 0.988461086333624,
        as_of_date: '2022-12-05',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1418732278',
      type: 'historical_price',
      attributes: {
        open: 401.14,
        close: 395.61,
        high: 401.65,
        low: 393.31,
        volume: 4232510.0,
        div_adj_factor: 0.9884610854124011,
        as_of_date: '2022-12-06',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1420183343',
      type: 'historical_price',
      attributes: {
        open: 394.42,
        close: 394.85,
        high: 397.32,
        low: 393.62,
        volume: 4077994.0,
        div_adj_factor: 0.9884610864885399,
        as_of_date: '2022-12-07',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1446759860',
      type: 'historical_price',
      attributes: {
        open: 396.82,
        close: 397.95,
        high: 399.05,
        low: 395.15,
        volume: 2484515.0,
        div_adj_factor: 0.9884610855635131,
        as_of_date: '2022-12-08',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1448906210',
      type: 'historical_price',
      attributes: {
        open: 396.64,
        close: 395.01,
        high: 399.34,
        low: 394.85,
        volume: 3540520.0,
        div_adj_factor: 0.9884610870610872,
        as_of_date: '2022-12-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1450907492',
      type: 'historical_price',
      attributes: {
        open: 395.869,
        close: 400.55,
        high: 400.66,
        low: 395.11,
        volume: 4998203.0,
        div_adj_factor: 0.9884610860067408,
        as_of_date: '2022-12-12',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1521478651',
      type: 'historical_price',
      attributes: {
        open: 410.33,
        close: 402.01,
        high: 410.44,
        low: 399.13,
        volume: 5899668.0,
        div_adj_factor: 0.9927329394791174,
        as_of_date: '2022-12-13',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1524931999',
      type: 'historical_price',
      attributes: {
        open: 401.61,
        close: 399.6,
        high: 405.6,
        low: 396.36,
        volume: 9398493.0,
        div_adj_factor: 0.9927329379379378,
        as_of_date: '2022-12-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1527997152',
      type: 'historical_price',
      attributes: {
        open: 394.34,
        close: 389.7,
        high: 395.245,
        low: 387.88,
        volume: 5864080.0,
        div_adj_factor: 0.9927329381575571,
        as_of_date: '2022-12-15',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1530277075',
      type: 'historical_price',
      attributes: {
        open: 386.9,
        close: 384.94,
        high: 388.27,
        low: 382.79,
        volume: 6667266.0,
        div_adj_factor: 0.9927329376006649,
        as_of_date: '2022-12-16',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1533554486',
      type: 'historical_price',
      attributes: {
        open: 385.26,
        close: 381.74,
        high: 385.56,
        low: 380.01,
        volume: 4289680.0,
        div_adj_factor: 0.9927329386493424,
        as_of_date: '2022-12-19',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1536446530',
      type: 'historical_price',
      attributes: {
        open: 380.97,
        close: 382.18,
        high: 383.91,
        low: 379.615,
        volume: 4451222.0,
        div_adj_factor: 0.9927329373593594,
        as_of_date: '2022-12-20',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1538212079',
      type: 'historical_price',
      attributes: {
        open: 385.13,
        close: 387.88,
        high: 389.16,
        low: 384.44,
        volume: 3875517.0,
        div_adj_factor: 0.9927329380220687,
        as_of_date: '2022-12-21',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1540447481',
      type: 'historical_price',
      attributes: {
        open: 384.76,
        close: 382.6,
        high: 385.08,
        low: 376.49,
        volume: 6463781.0,
        div_adj_factor: 0.9927329377940407,
        as_of_date: '2022-12-22',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1543229597',
      type: 'historical_price',
      attributes: {
        open: 381.44,
        close: 384.59,
        high: 384.7601,
        low: 379.77,
        volume: 3280122.0,
        div_adj_factor: 0.9927329389739724,
        as_of_date: '2022-12-23',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1545985870',
      type: 'historical_price',
      attributes: {
        open: 384.55,
        close: 383.11,
        high: 384.87,
        low: 381.42,
        volume: 4338979.0,
        div_adj_factor: 0.9927329383205867,
        as_of_date: '2022-12-27',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1547973768',
      type: 'historical_price',
      attributes: {
        open: 383.09,
        close: 378.46,
        high: 385.15,
        low: 378.15,
        volume: 4684727.0,
        div_adj_factor: 0.9927329387517836,
        as_of_date: '2022-12-28',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1551333915',
      type: 'historical_price',
      attributes: {
        open: 381.37,
        close: 385.01,
        high: 386.06,
        low: 380.84,
        volume: 5327278.0,
        div_adj_factor: 0.9927329394041713,
        as_of_date: '2022-12-29',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1555063952',
      type: 'historical_price',
      attributes: {
        open: 382.42,
        close: 384.21,
        high: 384.27,
        low: 380.17,
        volume: 5289961.0,
        div_adj_factor: 0.9927329377163531,
        as_of_date: '2022-12-30',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1557237866',
      type: 'historical_price',
      attributes: {
        open: 386.12,
        close: 382.53,
        high: 388.1099,
        low: 379.6,
        volume: 6454733.0,
        div_adj_factor: 0.9927329385930517,
        as_of_date: '2023-01-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1558538633',
      type: 'historical_price',
      attributes: {
        open: 384.94,
        close: 385.51,
        high: 387.63,
        low: 381.77,
        volume: 3805557.0,
        div_adj_factor: 0.9927329381857799,
        as_of_date: '2023-01-04',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1559820918',
      type: 'historical_price',
      attributes: {
        open: 383.44,
        close: 381.13,
        high: 383.545,
        low: 380.53,
        volume: 4329717.0,
        div_adj_factor: 0.9927329388922415,
        as_of_date: '2023-01-05',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1561107707',
      type: 'historical_price',
      attributes: {
        open: 384.35,
        close: 389.83,
        high: 391.03,
        low: 381.23,
        volume: 4839005.0,
        div_adj_factor: 0.9927329374342662,
        as_of_date: '2023-01-06',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1562521970',
      type: 'historical_price',
      attributes: {
        open: 392.17,
        close: 389.56,
        high: 395.5,
        low: 389.43,
        volume: 3474727.0,
        div_adj_factor: 0.9927329371598727,
        as_of_date: '2023-01-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1563851421',
      type: 'historical_price',
      attributes: {
        open: 389.02,
        close: 392.36,
        high: 392.44,
        low: 388.04,
        volume: 3649111.0,
        div_adj_factor: 0.9927329391375267,
        as_of_date: '2023-01-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1565116755',
      type: 'historical_price',
      attributes: {
        open: 394.06,
        close: 397.25,
        high: 397.4,
        low: 393.22,
        volume: 6273788.0,
        div_adj_factor: 0.9927329389553178,
        as_of_date: '2023-01-11',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1567211795',
      type: 'historical_price',
      attributes: {
        open: 398.47,
        close: 398.8,
        high: 400.31,
        low: 394.23,
        volume: 3988007.0,
        div_adj_factor: 0.9927329388164494,
        as_of_date: '2023-01-12',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1569740668',
      type: 'historical_price',
      attributes: {
        open: 395.46,
        close: 400.37,
        high: 400.92,
        low: 395.15,
        volume: 3192790.0,
        div_adj_factor: 0.9927329395309339,
        as_of_date: '2023-01-13',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1571695277',
      type: 'historical_price',
      attributes: {
        open: 400.37,
        close: 399.63,
        high: 402.065,
        low: 398.92,
        volume: 3510099.0,
        div_adj_factor: 0.9927329379676201,
        as_of_date: '2023-01-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1572933003',
      type: 'historical_price',
      attributes: {
        open: 400.87,
        close: 393.33,
        high: 401.94,
        low: 393.15,
        volume: 4348474.0,
        div_adj_factor: 0.9927329392621972,
        as_of_date: '2023-01-18',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1574224280',
      type: 'historical_price',
      attributes: {
        open: 391.1,
        close: 390.53,
        high: 392.8731,
        low: 389.08,
        volume: 2999950.0,
        div_adj_factor: 0.9927329372903492,
        as_of_date: '2023-01-19',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1575662591',
      type: 'historical_price',
      attributes: {
        open: 391.88,
        close: 397.7,
        high: 397.88,
        low: 390.19,
        volume: 2645499.0,
        div_adj_factor: 0.9927329394015589,
        as_of_date: '2023-01-20',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1577641694',
      type: 'historical_price',
      attributes: {
        open: 398.55,
        close: 402.42,
        high: 404.52,
        low: 397.6,
        volume: 5152423.0,
        div_adj_factor: 0.9927329382237463,
        as_of_date: '2023-01-23',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1579276135',
      type: 'historical_price',
      attributes: {
        open: 400.49,
        close: 402.43,
        high: 402.9,
        low: 399.64,
        volume: 4309892.0,
        div_adj_factor: 0.992732937405263,
        as_of_date: '2023-01-24',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1580480865',
      type: 'historical_price',
      attributes: {
        open: 397.75,
        close: 402.22,
        high: 402.57,
        low: 395.42,
        volume: 4555266.0,
        div_adj_factor: 0.9927329371985479,
        as_of_date: '2023-01-25',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1581752958',
      type: 'historical_price',
      attributes: {
        open: 405.04,
        close: 406.64,
        high: 406.8,
        low: 401.92,
        volume: 3067578.0,
        div_adj_factor: 0.9927329382254574,
        as_of_date: '2023-01-26',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1583166263',
      type: 'historical_price',
      attributes: {
        open: 405.48,
        close: 407.65,
        high: 410.07,
        low: 405.39,
        volume: 4013017.0,
        div_adj_factor: 0.9927329375689932,
        as_of_date: '2023-01-27',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1585161146',
      type: 'historical_price',
      attributes: {
        open: 404.66,
        close: 402.47,
        high: 407.02,
        low: 402.2,
        volume: 3457432.0,
        div_adj_factor: 0.992732939101051,
        as_of_date: '2023-01-30',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1586735321',
      type: 'historical_price',
      attributes: {
        open: 403.0,
        close: 408.31,
        high: 408.4,
        low: 402.67,
        volume: 6121226.0,
        div_adj_factor: 0.9927329382087139,
        as_of_date: '2023-01-31',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1588185710',
      type: 'historical_price',
      attributes: {
        open: 407.1,
        close: 412.67,
        high: 415.59,
        low: 404.22,
        volume: 5194565.0,
        div_adj_factor: 0.9927329391523494,
        as_of_date: '2023-02-01',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1590237465',
      type: 'historical_price',
      attributes: {
        open: 416.8,
        close: 418.66,
        high: 420.25,
        low: 414.8,
        volume: 4883296.0,
        div_adj_factor: 0.9927329384225863,
        as_of_date: '2023-02-02',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1591602999',
      type: 'historical_price',
      attributes: {
        open: 413.52,
        close: 414.35,
        high: 418.95,
        low: 413.04,
        volume: 4385968.0,
        div_adj_factor: 0.9927329383371545,
        as_of_date: '2023-02-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1593377086',
      type: 'historical_price',
      attributes: {
        open: 411.74,
        close: 411.8,
        high: 413.24,
        low: 410.03,
        volume: 2578974.0,
        div_adj_factor: 0.9927329383195727,
        as_of_date: '2023-02-06',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1594601489',
      type: 'historical_price',
      attributes: {
        open: 410.77,
        close: 417.12,
        high: 418.43,
        low: 409.53,
        volume: 5584762.0,
        div_adj_factor: 0.992732937763713,
        as_of_date: '2023-02-07',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1595942879',
      type: 'historical_price',
      attributes: {
        open: 415.05,
        close: 412.57,
        high: 416.46,
        low: 411.88,
        volume: 2872002.0,
        div_adj_factor: 0.9927329374409191,
        as_of_date: '2023-02-08',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1597433101',
      type: 'historical_price',
      attributes: {
        open: 416.3775,
        close: 409.07,
        high: 416.52,
        low: 407.73,
        volume: 3378847.0,
        div_adj_factor: 0.9927329381279488,
        as_of_date: '2023-02-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1599264567',
      type: 'historical_price',
      attributes: {
        open: 407.71,
        close: 409.96,
        high: 410.36,
        low: 406.93,
        volume: 2655938.0,
        div_adj_factor: 0.9927329373597424,
        as_of_date: '2023-02-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1601253241',
      type: 'historical_price',
      attributes: {
        open: 410.669,
        close: 414.78,
        high: 414.85,
        low: 410.19,
        volume: 3757214.0,
        div_adj_factor: 0.992732937943006,
        as_of_date: '2023-02-13',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1603597572',
      type: 'historical_price',
      attributes: {
        open: 413.16,
        close: 414.56,
        high: 417.0,
        low: 410.446,
        volume: 4222803.0,
        div_adj_factor: 0.9927329385372443,
        as_of_date: '2023-02-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1605983258',
      type: 'historical_price',
      attributes: {
        open: 412.26,
        close: 415.88,
        high: 415.96,
        low: 411.44,
        volume: 2969115.0,
        div_adj_factor: 0.9927329373857844,
        as_of_date: '2023-02-15',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1607909478',
      type: 'historical_price',
      attributes: {
        open: 410.74,
        close: 410.28,
        high: 414.82,
        low: 410.08,
        volume: 3347288.0,
        div_adj_factor: 0.9927329384810374,
        as_of_date: '2023-02-16',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1609829993',
      type: 'historical_price',
      attributes: {
        open: 407.95,
        close: 409.14,
        high: 409.39,
        low: 405.95,
        volume: 2039030.0,
        div_adj_factor: 0.9927329373808478,
        as_of_date: '2023-02-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1611994753',
      type: 'historical_price',
      attributes: {
        open: 404.92,
        close: 401.03,
        high: 406.0,
        low: 400.68,
        volume: 6280646.0,
        div_adj_factor: 0.9927329376854599,
        as_of_date: '2023-02-21',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1613597609',
      type: 'historical_price',
      attributes: {
        open: 401.38,
        close: 400.35,
        high: 402.98,
        low: 398.85,
        volume: 4145859.0,
        div_adj_factor: 0.9927329386786561,
        as_of_date: '2023-02-22',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1615217354',
      type: 'historical_price',
      attributes: {
        open: 403.46,
        close: 402.46,
        high: 404.045,
        low: 398.1,
        volume: 4570022.0,
        div_adj_factor: 0.9927329374347762,
        as_of_date: '2023-02-23',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1616899741',
      type: 'historical_price',
      attributes: {
        open: 397.21,
        close: 398.11,
        high: 399.07,
        low: 395.48,
        volume: 4450443.0,
        div_adj_factor: 0.9927329381326768,
        as_of_date: '2023-02-24',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1618694016',
      type: 'historical_price',
      attributes: {
        open: 401.74,
        close: 399.5,
        high: 403.15,
        low: 398.61,
        volume: 4547747.0,
        div_adj_factor: 0.9927329386733417,
        as_of_date: '2023-02-27',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1620549957',
      type: 'historical_price',
      attributes: {
        open: 399.06,
        close: 397.97,
        high: 401.11,
        low: 397.97,
        volume: 5191528.0,
        div_adj_factor: 0.9927329371560669,
        as_of_date: '2023-02-28',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1622414488',
      type: 'historical_price',
      attributes: {
        open: 397.22,
        close: 396.55,
        high: 398.5,
        low: 395.2,
        volume: 6327361.0,
        div_adj_factor: 0.9927329390997353,
        as_of_date: '2023-03-01',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1631665247',
      type: 'historical_price',
      attributes: {
        open: 394.498,
        close: 399.67,
        high: 400.53,
        low: 394.2023,
        volume: 3004474.0,
        div_adj_factor: 0.9927329371731679,
        as_of_date: '2023-03-02',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1633041704',
      type: 'historical_price',
      attributes: {
        open: 401.58,
        close: 406.08,
        high: 406.34,
        low: 400.91,
        volume: 3167297.0,
        div_adj_factor: 0.992732939322301,
        as_of_date: '2023-03-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1634633084',
      type: 'historical_price',
      attributes: {
        open: 407.06,
        close: 406.54,
        high: 409.38,
        low: 405.9641,
        volume: 5754570.0,
        div_adj_factor: 0.9927329389481969,
        as_of_date: '2023-03-06',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1635768729',
      type: 'historical_price',
      attributes: {
        open: 406.34,
        close: 400.13,
        high: 406.58,
        low: 399.49,
        volume: 3536209.0,
        div_adj_factor: 0.9927329392947293,
        as_of_date: '2023-03-07',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1636915393',
      type: 'historical_price',
      attributes: {
        open: 400.3,
        close: 400.83,
        high: 401.5899,
        low: 398.44,
        volume: 3423540.0,
        div_adj_factor: 0.9927329391512612,
        as_of_date: '2023-03-08',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1638536865',
      type: 'historical_price',
      attributes: {
        open: 401.63,
        close: 393.41,
        high: 403.33,
        low: 392.32,
        volume: 3578709.0,
        div_adj_factor: 0.9927329376477465,
        as_of_date: '2023-03-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1640580366',
      type: 'historical_price',
      attributes: {
        open: 392.85,
        close: 387.88,
        high: 394.945,
        low: 386.11,
        volume: 6751220.0,
        div_adj_factor: 0.9927329380220687,
        as_of_date: '2023-03-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1642636601',
      type: 'historical_price',
      attributes: {
        open: 383.5,
        close: 387.07,
        high: 392.05,
        low: 382.37,
        volume: 5579127.0,
        div_adj_factor: 0.9927329371948227,
        as_of_date: '2023-03-13',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1645219323',
      type: 'historical_price',
      attributes: {
        open: 392.32,
        close: 393.58,
        high: 395.26,
        low: 388.82,
        volume: 6004891.0,
        div_adj_factor: 0.9927329386655827,
        as_of_date: '2023-03-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1648023909',
      type: 'historical_price',
      attributes: {
        open: 387.59,
        close: 391.16,
        high: 391.2,
        low: 385.45,
        volume: 7838392.0,
        div_adj_factor: 0.9927329379282134,
        as_of_date: '2023-03-15',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1649911709',
      type: 'historical_price',
      attributes: {
        open: 388.66,
        close: 397.89,
        high: 398.25,
        low: 388.05,
        volume: 6543846.0,
        div_adj_factor: 0.9927329387519164,
        as_of_date: '2023-03-16',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1651909297',
      type: 'historical_price',
      attributes: {
        open: 396.6,
        close: 393.17,
        high: 397.7,
        low: 391.86,
        volume: 6487547.0,
        div_adj_factor: 0.992732937406211,
        as_of_date: '2023-03-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1653667723',
      type: 'historical_price',
      attributes: {
        open: 394.14,
        close: 397.07,
        high: 397.5,
        low: 393.38,
        volume: 4602565.0,
        div_adj_factor: 0.9927329387765381,
        as_of_date: '2023-03-20',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1656313155',
      type: 'historical_price',
      attributes: {
        open: 400.63,
        close: 402.23,
        high: 402.82,
        low: 398.95,
        volume: 8656680.0,
        div_adj_factor: 0.9927329388658229,
        as_of_date: '2023-03-21',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1658073155',
      type: 'historical_price',
      attributes: {
        open: 402.13,
        close: 395.49,
        high: 405.87,
        low: 395.41,
        volume: 4659897.0,
        div_adj_factor: 0.9927329388859389,
        as_of_date: '2023-03-22',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1660011444',
      type: 'historical_price',
      attributes: {
        open: 396.89,
        close: 394.84,
        high: 401.02,
        low: 392.08,
        volume: 4743633.0,
        div_adj_factor: 0.9968867591935975,
        as_of_date: '2023-03-23',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1662248567',
      type: 'historical_price',
      attributes: {
        open: 393.54,
        close: 397.45,
        high: 397.524,
        low: 391.09,
        volume: 4867812.0,
        div_adj_factor: 0.9968867580827778,
        as_of_date: '2023-03-24',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1664013804',
      type: 'historical_price',
      attributes: {
        open: 399.93,
        close: 398.14,
        high: 400.625,
        low: 397.29,
        volume: 4509654.0,
        div_adj_factor: 0.9968867584266841,
        as_of_date: '2023-03-27',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1665301270',
      type: 'historical_price',
      attributes: {
        open: 397.47,
        close: 397.4,
        high: 398.21,
        low: 395.4001,
        volume: 2419012.0,
        div_adj_factor: 0.996886758933065,
        as_of_date: '2023-03-28',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1666401376',
      type: 'historical_price',
      attributes: {
        open: 401.66,
        close: 403.15,
        high: 403.37,
        low: 400.45,
        volume: 4369062.0,
        div_adj_factor: 0.996886759270743,
        as_of_date: '2023-03-29',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1669120630',
      type: 'historical_price',
      attributes: {
        open: 405.84,
        close: 405.39,
        high: 406.1,
        low: 403.4812,
        volume: 4066361.0,
        div_adj_factor: 0.9968867584301537,
        as_of_date: '2023-03-30',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1672034652',
      type: 'historical_price',
      attributes: {
        open: 406.48,
        close: 411.08,
        high: 411.44,
        low: 406.35,
        volume: 4224549.0,
        div_adj_factor: 0.996886759268269,
        as_of_date: '2023-03-31',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1674225129',
      type: 'historical_price',
      attributes: {
        open: 410.71,
        close: 412.54,
        high: 413.16,
        low: 410.2,
        volume: 4455343.0,
        div_adj_factor: 0.9968867600717506,
        as_of_date: '2023-04-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1676656371',
      type: 'historical_price',
      attributes: {
        open: 413.42,
        close: 410.43,
        high: 413.69,
        low: 409.0,
        volume: 3496476.0,
        div_adj_factor: 0.996886760227079,
        as_of_date: '2023-04-04',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1678032483',
      type: 'historical_price',
      attributes: {
        open: 409.74,
        close: 409.46,
        high: 410.48,
        low: 407.65,
        volume: 3698876.0,
        div_adj_factor: 0.9968867581692962,
        as_of_date: '2023-04-05',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1679323461',
      type: 'historical_price',
      attributes: {
        open: 408.57,
        close: 411.01,
        high: 411.265,
        low: 407.44,
        volume: 2975475.0,
        div_adj_factor: 0.9968867594462423,
        as_of_date: '2023-04-06',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1680967751',
      type: 'historical_price',
      attributes: {
        open: 408.37,
        close: 411.48,
        high: 411.5,
        low: 407.76,
        volume: 2778047.0,
        div_adj_factor: 0.9968867599883348,
        as_of_date: '2023-04-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1682070790',
      type: 'historical_price',
      attributes: {
        open: 412.02,
        close: 411.47,
        high: 412.97,
        low: 410.69,
        volume: 3656985.0,
        div_adj_factor: 0.9968867596665613,
        as_of_date: '2023-04-11',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1683339708',
      type: 'historical_price',
      attributes: {
        open: 413.68,
        close: 409.93,
        high: 413.94,
        low: 409.225,
        volume: 3958994.0,
        div_adj_factor: 0.9968867587149026,
        as_of_date: '2023-04-12',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1685440196',
      type: 'historical_price',
      attributes: {
        open: 411.04,
        close: 415.27,
        high: 415.62,
        low: 410.5,
        volume: 3570097.0,
        div_adj_factor: 0.9968867604209311,
        as_of_date: '2023-04-13',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1687833634',
      type: 'historical_price',
      attributes: {
        open: 414.64,
        close: 414.25,
        high: 416.89,
        low: 411.85,
        volume: 3546711.0,
        div_adj_factor: 0.9968867592033795,
        as_of_date: '2023-04-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1690149604',
      type: 'historical_price',
      attributes: {
        open: 414.14,
        close: 415.78,
        high: 415.85,
        low: 412.88,
        volume: 2482668.0,
        div_adj_factor: 0.9968867598249074,
        as_of_date: '2023-04-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1691498186',
      type: 'historical_price',
      attributes: {
        open: 417.44,
        close: 416.02,
        high: 417.52,
        low: 414.6,
        volume: 2653384.0,
        div_adj_factor: 0.996886760251911,
        as_of_date: '2023-04-18',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1692710872',
      type: 'historical_price',
      attributes: {
        open: 414.02,
        close: 415.99,
        high: 416.87,
        low: 413.98,
        volume: 2936952.0,
        div_adj_factor: 0.9968867592970985,
        as_of_date: '2023-04-19',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1694312011',
      type: 'historical_price',
      attributes: {
        open: 412.96,
        close: 413.66,
        high: 415.5,
        low: 412.0701,
        volume: 3279818.0,
        div_adj_factor: 0.9968867596576899,
        as_of_date: '2023-04-20',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1696174272',
      type: 'historical_price',
      attributes: {
        open: 413.99,
        close: 413.89,
        high: 414.46,
        low: 412.0,
        volume: 3383997.0,
        div_adj_factor: 0.9968867597670878,
        as_of_date: '2023-04-21',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1697951819',
      type: 'historical_price',
      attributes: {
        open: 413.75,
        close: 414.41,
        high: 414.8496,
        low: 412.39,
        volume: 3398523.0,
        div_adj_factor: 0.9968867594893945,
        as_of_date: '2023-04-24',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1699619710',
      type: 'historical_price',
      attributes: {
        open: 412.34,
        close: 407.83,
        high: 412.89,
        low: 407.79,
        volume: 3686817.0,
        div_adj_factor: 0.9968867591888777,
        as_of_date: '2023-04-25',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1701070267',
      type: 'historical_price',
      attributes: {
        open: 408.47,
        close: 406.17,
        high: 409.59,
        low: 405.54,
        volume: 5637873.0,
        div_adj_factor: 0.9968867592387423,
        as_of_date: '2023-04-26',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1702970604',
      type: 'historical_price',
      attributes: {
        open: 408.75,
        close: 414.23,
        high: 414.49,
        low: 408.55,
        volume: 4156062.0,
        div_adj_factor: 0.9968867585640827,
        as_of_date: '2023-04-27',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1704863855',
      type: 'historical_price',
      attributes: {
        open: 413.27,
        close: 417.66,
        high: 417.74,
        low: 413.23,
        volume: 3871085.0,
        div_adj_factor: 0.9968867595651966,
        as_of_date: '2023-04-28',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1706769309',
      type: 'historical_price',
      attributes: {
        open: 417.29,
        close: 417.36,
        high: 419.42,
        low: 417.1,
        volume: 2813270.0,
        div_adj_factor: 0.9968867596319724,
        as_of_date: '2023-05-01',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1708815100',
      type: 'historical_price',
      attributes: {
        open: 416.54,
        close: 412.69,
        high: 416.64,
        low: 409.59,
        volume: 4604715.0,
        div_adj_factor: 0.9968867600378007,
        as_of_date: '2023-05-02',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1710185166',
      type: 'historical_price',
      attributes: {
        open: 413.18,
        close: 409.72,
        high: 415.64,
        low: 409.56,
        volume: 3746353.0,
        div_adj_factor: 0.9968867592502195,
        as_of_date: '2023-05-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1711689435',
      type: 'historical_price',
      attributes: {
        open: 408.65,
        close: 406.86,
        high: 409.025,
        low: 405.54,
        volume: 4185948.0,
        div_adj_factor: 0.9968867595733175,
        as_of_date: '2023-05-04',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1713566436',
      type: 'historical_price',
      attributes: {
        open: 410.68,
        close: 414.3,
        high: 415.53,
        low: 410.43,
        volume: 2992865.0,
        div_adj_factor: 0.9968867583876417,
        as_of_date: '2023-05-05',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1715349847',
      type: 'historical_price',
      attributes: {
        open: 414.78,
        close: 414.52,
        high: 415.06,
        low: 413.1,
        volume: 2955667.0,
        div_adj_factor: 0.9968867581781338,
        as_of_date: '2023-05-08',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1716810345',
      type: 'historical_price',
      attributes: {
        open: 412.92,
        close: 412.83,
        high: 413.88,
        low: 412.48,
        volume: 2571939.0,
        div_adj_factor: 0.9968867596831625,
        as_of_date: '2023-05-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1718610084',
      type: 'historical_price',
      attributes: {
        open: 415.7,
        close: 414.57,
        high: 416.3428,
        low: 410.67,
        volume: 3186117.0,
        div_adj_factor: 0.9968867597751887,
        as_of_date: '2023-05-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1720555973',
      type: 'historical_price',
      attributes: {
        open: 413.74,
        close: 413.95,
        high: 414.21,
        low: 411.75,
        volume: 2509843.0,
        div_adj_factor: 0.9968867592704433,
        as_of_date: '2023-05-11',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1723423870',
      type: 'historical_price',
      attributes: {
        open: 415.27,
        close: 413.41,
        high: 415.37,
        low: 410.87,
        volume: 2281584.0,
        div_adj_factor: 0.9968867589076219,
        as_of_date: '2023-05-12',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1726308956',
      type: 'historical_price',
      attributes: {
        open: 414.11,
        close: 414.78,
        high: 415.23,
        low: 412.05,
        volume: 1934154.0,
        div_adj_factor: 0.9968867592458653,
        as_of_date: '2023-05-15',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1727982263',
      type: 'historical_price',
      attributes: {
        open: 413.7,
        close: 412.01,
        high: 414.62,
        low: 412.01,
        volume: 3433846.0,
        div_adj_factor: 0.9968867600300964,
        as_of_date: '2023-05-16',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1729599349',
      type: 'historical_price',
      attributes: {
        open: 414.2,
        close: 417.01,
        high: 417.67,
        low: 412.43,
        volume: 3131327.0,
        div_adj_factor: 0.9968867581113163,
        as_of_date: '2023-05-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1731580275',
      type: 'historical_price',
      attributes: {
        open: 416.8,
        close: 421.05,
        high: 421.52,
        low: 416.5,
        volume: 3087097.0,
        div_adj_factor: 0.9968867592922456,
        as_of_date: '2023-05-18',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1733507122',
      type: 'historical_price',
      attributes: {
        open: 422.02,
        close: 420.44,
        high: 422.59,
        low: 419.21,
        volume: 3873198.0,
        div_adj_factor: 0.9968867591095044,
        as_of_date: '2023-05-19',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1735654082',
      type: 'historical_price',
      attributes: {
        open: 420.51,
        close: 420.56,
        high: 422.26,
        low: 419.21,
        volume: 3076644.0,
        div_adj_factor: 0.9968867581320144,
        as_of_date: '2023-05-22',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1737462622',
      type: 'historical_price',
      attributes: {
        open: 418.93,
        close: 415.96,
        high: 419.88,
        low: 415.5096,
        volume: 3221021.0,
        div_adj_factor: 0.9968867583421482,
        as_of_date: '2023-05-23',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1738997564',
      type: 'historical_price',
      attributes: {
        open: 414.24,
        close: 412.84,
        high: 414.5857,
        low: 411.67,
        volume: 3633825.0,
        div_adj_factor: 0.9968867600038757,
        as_of_date: '2023-05-24',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1740706077',
      type: 'historical_price',
      attributes: {
        open: 416.56,
        close: 416.48,
        high: 417.97,
        low: 414.2101,
        volume: 3487772.0,
        div_adj_factor: 0.9968867580676143,
        as_of_date: '2023-05-25',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1742463884',
      type: 'historical_price',
      attributes: {
        open: 417.18,
        close: 421.95,
        high: 422.63,
        low: 417.09,
        volume: 5531300.0,
        div_adj_factor: 0.9968867590946795,
        as_of_date: '2023-05-26',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1744814397',
      type: 'historical_price',
      attributes: {
        open: 423.91,
        close: 422.03,
        high: 424.43,
        low: 420.62,
        volume: 3239552.0,
        div_adj_factor: 0.9968867592351255,
        as_of_date: '2023-05-30',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1748065205',
      type: 'historical_price',
      attributes: {
        open: 420.11,
        close: 419.43,
        high: 421.07,
        low: 418.07,
        volume: 4479589.0,
        div_adj_factor: 0.9968867582194884,
        as_of_date: '2023-05-31',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1750846154',
      type: 'historical_price',
      attributes: {
        open: 419.96,
        close: 423.75,
        high: 424.8,
        low: 418.7,
        volume: 3786339.0,
        div_adj_factor: 0.9968867587020649,
        as_of_date: '2023-06-01',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1753244792',
      type: 'historical_price',
      attributes: {
        open: 426.37,
        close: 429.79,
        high: 430.67,
        low: 425.88,
        volume: 4525708.0,
        div_adj_factor: 0.996886758649573,
        as_of_date: '2023-06-02',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1754828170',
      type: 'historical_price',
      attributes: {
        open: 430.22,
        close: 429.05,
        high: 431.569,
        low: 428.3,
        volume: 4318293.0,
        div_adj_factor: 0.9968867591189838,
        as_of_date: '2023-06-05',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1756295354',
      type: 'historical_price',
      attributes: {
        open: 428.59,
        close: 429.96,
        high: 430.5,
        low: 427.92,
        volume: 3539867.0,
        div_adj_factor: 0.9968867592334171,
        as_of_date: '2023-06-06',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1757885414',
      type: 'historical_price',
      attributes: {
        open: null,
        close: 427.57,
        high: 430.21,
        low: 426.7,
        volume: 53850.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-07',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1760444106',
      type: 'historical_price',
      attributes: {
        open: 427.14,
        close: 429.68,
        high: 430.2,
        low: 426.43,
        volume: 3473459.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-08',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1762351309',
      type: 'historical_price',
      attributes: {
        open: 430.54,
        close: 430.54,
        high: 432.5962,
        low: 429.48,
        volume: 4141371.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1764230756',
      type: 'historical_price',
      attributes: {
        open: 431.49,
        close: 434.45,
        high: 434.49,
        low: 430.77,
        volume: 4294439.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-12',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1765644403',
      type: 'historical_price',
      attributes: {
        open: 435.97,
        close: 437.29,
        high: 437.98,
        low: 435.26,
        volume: 5444491.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-13',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1768763729',
      type: 'historical_price',
      attributes: {
        open: 437.65,
        close: 437.8,
        high: 439.72,
        low: 434.24,
        volume: 5957989.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1772640529',
      type: 'historical_price',
      attributes: {
        open: 437.01,
        close: 443.21,
        high: 444.57,
        low: 436.87,
        volume: 5928686.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-15',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1774597182',
      type: 'historical_price',
      attributes: {
        open: 445.39,
        close: 441.63,
        high: 445.48,
        low: 441.25,
        volume: 6474382.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-16',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1777162768',
      type: 'historical_price',
      attributes: {
        open: 439.715,
        close: 439.54,
        high: 441.5322,
        low: 437.3,
        volume: 4506011.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-20',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1778942806',
      type: 'historical_price',
      attributes: {
        open: 438.44,
        close: 437.22,
        high: 439.4702,
        low: 436.64,
        volume: 4067560.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-21',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1780750840',
      type: 'historical_price',
      attributes: {
        open: 436.25,
        close: 438.8,
        high: 438.9,
        low: 435.86,
        volume: 2512324.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-22',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1781966024',
      type: 'historical_price',
      attributes: {
        open: 435.19,
        close: 435.46,
        high: 437.35,
        low: 434.75,
        volume: 2651382.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-23',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1783775079',
      type: 'historical_price',
      attributes: {
        open: 434.89,
        close: 433.62,
        high: 436.86,
        low: 433.44,
        volume: 4936618.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-26',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1785450338',
      type: 'historical_price',
      attributes: {
        open: 434.64,
        close: 438.42,
        high: 439.08,
        low: 433.5217,
        volume: 5254422.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-27',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1787351071',
      type: 'historical_price',
      attributes: {
        open: 437.35,
        close: 438.56,
        high: 439.75,
        low: 436.7,
        volume: 3445646.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-28',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1791648132',
      type: 'historical_price',
      attributes: {
        open: 438.22,
        close: 440.31,
        high: 440.59,
        low: 437.88,
        volume: 3389380.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-29',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1795121431',
      type: 'historical_price',
      attributes: {
        open: 443.75,
        close: 445.71,
        high: 446.615,
        low: 443.45,
        volume: 5137766.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-06-30',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1799474827',
      type: 'historical_price',
      attributes: {
        open: 445.23,
        close: 446.35,
        high: 446.43,
        low: 444.96,
        volume: 1928101.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1805698865',
      type: 'historical_price',
      attributes: {
        open: 444.19,
        close: 445.58,
        high: 446.3595,
        low: 444.19,
        volume: 6217850.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-05',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1809244873',
      type: 'historical_price',
      attributes: {
        open: 441.8,
        close: 441.93,
        high: 442.3979,
        low: 439.35,
        volume: 3248814.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-06',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1812800273',
      type: 'historical_price',
      attributes: {
        open: 440.94,
        close: 440.8,
        high: 444.96,
        low: 440.59,
        volume: 3441701.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-07',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1814468132',
      type: 'historical_price',
      attributes: {
        open: 440.48,
        close: 441.97,
        high: 442.138,
        low: 439.88,
        volume: 2526460.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1816232575',
      type: 'historical_price',
      attributes: {
        open: 442.78,
        close: 444.94,
        high: 445.3,
        low: 441.745,
        volume: 4775881.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-11',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1819983968',
      type: 'historical_price',
      attributes: {
        open: 448.81,
        close: 448.28,
        high: 449.83,
        low: 447.28,
        volume: 4714042.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-12',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1824536510',
      type: 'historical_price',
      attributes: {
        open: 450.25,
        close: 452.1,
        high: 452.78,
        low: 449.81,
        volume: 4179536.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-13',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1829504331',
      type: 'historical_price',
      attributes: {
        open: 452.9,
        close: 451.65,
        high: 453.75,
        low: 450.97,
        volume: 3437983.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1833709670',
      type: 'historical_price',
      attributes: {
        open: 451.47,
        close: 453.33,
        high: 454.33,
        low: 451.45,
        volume: 4500330.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1835174789',
      type: 'historical_price',
      attributes: {
        open: 452.85,
        close: 456.62,
        high: 457.29,
        low: 452.44,
        volume: 6456870.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-18',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1838801329',
      type: 'historical_price',
      attributes: {
        open: 457.45,
        close: 457.46,
        high: 458.82,
        low: 456.7939,
        volume: 3182163.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-19',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1842747663',
      type: 'historical_price',
      attributes: {
        open: 456.58,
        close: 454.61,
        high: 457.49,
        low: 453.86,
        volume: 10647080.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-20',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1847170144',
      type: 'historical_price',
      attributes: {
        open: 456.37,
        close: 454.6,
        high: 456.58,
        low: 454.58,
        volume: 3502434.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-21',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1851374250',
      type: 'historical_price',
      attributes: {
        open: 455.78,
        close: 456.61,
        high: 457.44,
        low: 455.16,
        volume: 2632021.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-24',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1854970283',
      type: 'historical_price',
      attributes: {
        open: 456.32,
        close: 457.84,
        high: 459.16,
        low: 456.25,
        volume: 3987042.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-25',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1858536124',
      type: 'historical_price',
      attributes: {
        open: 456.89,
        close: 457.88,
        high: 459.36,
        low: 455.79,
        volume: 5592140.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-26',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1862132267',
      type: 'historical_price',
      attributes: {
        open: 461.49,
        close: 454.92,
        high: 461.88,
        low: 453.955,
        volume: 3413256.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-27',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1866373390',
      type: 'historical_price',
      attributes: {
        open: 458.24,
        close: 459.22,
        high: 460.26,
        low: 457.5,
        volume: 4258847.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-28',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1871024882',
      type: 'historical_price',
      attributes: {
        open: 459.85,
        close: 460.18,
        high: 460.58,
        low: 458.49,
        volume: 3947987.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-07-31',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1875553846',
      type: 'historical_price',
      attributes: {
        open: 458.74,
        close: 458.9,
        high: 459.62,
        low: 457.93,
        volume: 3756702.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-01',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1879841163',
      type: 'historical_price',
      attributes: {
        open: 455.67,
        close: 452.49,
        high: 455.91,
        low: 451.74,
        volume: 3256279.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-02',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1883627938',
      type: 'historical_price',
      attributes: {
        open: 450.42,
        close: 451.19,
        high: 453.11,
        low: 449.75,
        volume: 3276793.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-03',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1887507196',
      type: 'historical_price',
      attributes: {
        open: 453.13,
        close: 449.09,
        high: 455.28,
        low: 448.65,
        volume: 4359894.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-04',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1889473202',
      type: 'historical_price',
      attributes: {
        open: 451.1,
        close: 453.06,
        high: 453.24,
        low: 450.39,
        volume: 2223593.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-07',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1892717562',
      type: 'historical_price',
      attributes: {
        open: 450.43,
        close: 451.16,
        high: 451.5797,
        low: 447.65,
        volume: 3554599.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-08',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1896294391',
      type: 'historical_price',
      attributes: {
        open: 451.41,
        close: 448.11,
        high: 451.57,
        low: 447.33,
        volume: 2838233.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-09',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1900543768',
      type: 'historical_price',
      attributes: {
        open: 450.56,
        close: 448.31,
        high: 454.1,
        low: 447.07,
        volume: 4508484.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-10',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1904903208',
      type: 'historical_price',
      attributes: {
        open: 446.33,
        close: 448.04,
        high: 449.04,
        low: 445.7,
        volume: 3757839.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-11',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1909887146',
      type: 'historical_price',
      attributes: {
        open: 447.03,
        close: 450.44,
        high: 450.51,
        low: 446.76,
        volume: 2387427.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-14',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1914828417',
      type: 'historical_price',
      attributes: {
        open: 448.69,
        close: 445.34,
        high: 448.9752,
        low: 444.65,
        volume: 5019311.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-15',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1919473271',
      type: 'historical_price',
      attributes: {
        open: 444.82,
        close: 442.01,
        high: 446.53,
        low: 441.87,
        volume: 2896093.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-16',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1924078099',
      type: 'historical_price',
      attributes: {
        open: 443.45,
        close: 438.61,
        high: 443.76,
        low: 438.07,
        volume: 3991019.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-17',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
    {
      id: '1928336081',
      type: 'historical_price',
      attributes: {
        open: 435.63,
        close: 438.69,
        high: 439.86,
        low: 435.29,
        volume: 3164229.0,
        div_adj_factor: 1.0,
        as_of_date: '2023-08-18',
      },
      relationships: {
        ticker: {
          data: {
            id: '338',
            type: 'ticker',
          },
        },
      },
    },
  ]

  getCurrentStock(date: string) {
    const currentStock = this.priceHistories.find((item) => {
      return item.attributes.as_of_date === date
    })
    if (!currentStock) {
      const newDate = dayjs(date).add(1, 'day').format('YYYY-MM-DD')
      return this.getCurrentStock(newDate)
    }

    return currentStock
  }

  async createByZant(portfolioId: string): Promise<TransactionResponse[]> {
    try {
      const ivv = await this.stocksService.get('IVV')
      const query: ExchangeQuery = { type: 'all' }
      const exchanges = await this.exchangesService.getAllByPortfolioId(portfolioId, query)
      for (let index = 0; index < exchanges.length; index++) {
        const exchange = exchanges[index]

        const date = dayjs(exchange.dateOfOrder).format('YYYY-MM-DD')
        const currentStock = this.getCurrentStock(date)

        const closePrice = currentStock.attributes.close
        const amountUSD = exchange.to.amount
        const buyStock: UpdateStocksRequest = {
          ...ivv,
          price: closePrice,
          share: amountUSD / closePrice,
        }
        const body: CreateTransactionRequest = {
          portfolioId,
          type: TransactionType.BUY,
          stocks: buyStock,
          payments: [exchange.from, exchange.to],
          commission: 0,
          tax: 0,
          totalAmount: exchange.from.amount,
          status: TransactionStatus.SUCCESS,
          dateOfOrder: dayjs(currentStock.attributes.as_of_date).startOf('day').toDate(),
        }

        await new this.transactionModel(body).save()
      }
      return this.getAllBySymbol('IVV')
    } catch (error) {}
  }

  async update(updateRequest: UpdateTransactionRequest): Promise<TransactionResponse> {
    const { _id } = updateRequest
    await this.transactionModel.updateOne({ _id: new Types.ObjectId(_id) }, updateRequest)
    return this.get(_id)
  }

  async delete(id: string): Promise<TransactionResponse> {
    const item = await this.get(id)
    await this.transactionModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }
}
