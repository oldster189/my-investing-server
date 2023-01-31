import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { modelMapper } from 'src/utils/mapper.util'
import { CreateTransactionRequest, UpdateTransactionRequest } from './requests/create-transaction.request'
import { TransactionListResponse, TransactionResponse } from './responses/transaction.response'
import { Transaction, TransactionDocument } from './schemas/transaction.schema'

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>) {}

  async get(id: string): Promise<TransactionResponse> {
    const item = await this.transactionModel.findById(id)
    return modelMapper(TransactionResponse, item)
  }

  async getAll(): Promise<TransactionResponse[]> {
    const list = await this.transactionModel.find()
    return modelMapper(TransactionListResponse, { data: list }).data
  }

  async create(createRequest: CreateTransactionRequest): Promise<TransactionResponse> {
    const newItem = await new this.transactionModel(createRequest).save()
    return this.get(String(newItem._id))
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
