import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommisionDocument, CommisionModel } from './entities/commision.entity';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from 'src/user/entities/user.entity';

@Injectable()
export class CommisionService {

  constructor(
    @InjectModel(CommisionModel) private commision: Model<CommisionDocument>,
    @InjectModel(UserModel) private user: Model<UserDocument>
  ) { }

  async update(body) {
    try {
      const user = await this.user.findOne({ email: body.email })
      if (user) {
        if (user.userType == 'admin') {
          const data = await this.commision.find()
          const { _id } = data[0]
          const newCommision = await this.commision.findByIdAndUpdate(_id, { percentage: body.percentage }, { new: true })

          return {
            message: 'Commision updated',
            statusCode: 200,
            data: newCommision
          }
        }
        else {
          throw new UnauthorizedException({
            message: 'Only admin can update commision.', data: null,
            statusCode: 400
          })
        }
      }
      else {
        throw new NotFoundException({
          message: 'User not found.', data: null,
          statusCode: 400
        })
      }
    } catch (error) {
      return error.response
    }
  }

  async sum(value, id) {
    try {
      console.log(value)
      const user = await this.user.findById(id)
      if (user) {
        if (user.userType === 'admin') {
          const data = await this.user.countDocuments({ 'userType': value })
          if (data) {
            return {
              message: `Total ${value} are ${data}`,
              statusCode: 200,
              data
            }
          }
          else {
            throw new NotFoundException({
              message: `${value} Not found`, data: null,
              statusCode: 400
            })
          }
        }
        else {
          throw new UnauthorizedException({
            message: 'Only admin can access.', data: null,
            statusCode: 400
          })
        }
      }
      else {
        throw new NotFoundException({
          message: 'User not  found.', data: null,
          statusCode: 400
        })
      }
    } catch (error) {
      return error.response
    }
  }

  create() {
    return this.commision.create({ percentage: 10 })
  }

}
