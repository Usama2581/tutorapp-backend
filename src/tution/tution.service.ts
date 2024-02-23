import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TutionDocument, TutionModel } from './entities/tution.entity';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from '../user/entities/user.entity';
import { CommisionDocument, CommisionModel } from 'src/commision/entities/commision.entity';
import { ProposalDocument, ProposalModel } from 'src/proposal/entities/proposal.entity';


@Injectable()
export class TutionService {

  constructor(
    @InjectModel(UserModel) private user: Model<UserDocument>,
    @InjectModel(CommisionModel) private commision: Model<CommisionDocument>,
    @InjectModel(ProposalModel) private proposal: Model<ProposalDocument>,
    @InjectModel(TutionModel) private tution: Model<TutionDocument>
  ) { }

  findUser(user) {
    try {
      return this.user.findOne({ _id: user })
    } catch (error) {
      return error.response
    }
  }

  async postTution(body) {
    try {
      const user = await this.findUser(body.user)

      if (user) {
        if (user.userType === 'student') {

          const commision = await this.commision.find()
          const newBody = { ...body, commision: commision[0].percentage }

          const tution = await this.tution.create(newBody)

          return {
            message: 'posted',
            statusCode: 200,
            data: tution
          }

        }
        else {
          throw new NotFoundException({
            message: 'only sudents can post tution', data: null,
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

  async find() {
    try {
      const tution = await this.tution.find().populate('user')
      if (tution.length == 0) {
        throw new BadRequestException({
          message: 'Tutions not found.', data: null,
          statusCode: 400
        })
      }
      else {
        return {
          message: 'tutions..',
          statusCode: 200,
          data: tution
        }
      }
    } catch (error) {
      return error.response
    }
  }

  async findUserTution(id) {
    try {
      const user = await this.findUser(id)
      if (user) {
        const tution = await this.tution.find({ user: id })
        if (tution.length === 0) {
          throw new ServiceUnavailableException({
            message: 'No tutions found.', data: null,
            statusCode: 400
          })
        }
        else {
          return {
            message: 'tutions',
            statusCode: 200,
            data: tution
          }
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

  async findTutionIfProposalExsist(userId, tutionId) {
    try {
      const user = await this.user.findById({ _id: userId })
      if (user) {
        if (user.userType === 'student') {
          const tution = await this.tution.find({
            $and: [
              { user: { $eq: userId } },
              { proposalsReceived: { $eq: true } }
            ]
          })
          if (tution) {
            if (tution.length === 0) {
              throw new NotFoundException({
                message: 'tutions not found.',
                data: null,
                statusCode: 400
              })
            }
            else {
              return {
                message: 'Tution found',
                statusCode: 200,
                data: tution
              }
            }
          }
          else {
            throw new NotFoundException({
              message: 'tution doesnot exsist.', data: null,
              statusCode: 400
            })
          }
        }
        else {
          throw new ServiceUnavailableException({
            message: 'only students can access this.', data: null,
            statusCode: 400
          })
        }
      }
      else {
        throw new ServiceUnavailableException({
          message: 'user not found.', data: null,
          statusCode: 400
        })
      }
    } catch (error) {
      return error.response
    }
  }

  async updateTution(userId, tutionId, body) {
    try {
      const user = await this.user.findOne({ _id: userId })
      if (user) {
        if (user.userType === 'student') {
          const tution = await this.tution.findOne({ _id: tutionId })
          if (tution) {
            const result = await this.tution.findByIdAndUpdate({ _id: tution._id }, body, { new: true })
            return {
              message: 'tution updated',
              statusCode: 200,
              data: result
            }
          }
          else {
            throw new NotFoundException({
              message: 'tutin not found', data: null,
              statusCode: 400
            })
          }
        }
        else {
          throw new NotFoundException({
            message: 'only student can access this.', data: null,
            statusCode: 400
          })
        }
      }
      else {
        throw new NotFoundException({
          message: 'user not found', data: null,
          statusCode: 400
        })
      }
    } catch (error) {
      return error.response
    }
  }

  async getTutionByStatus(value, userId) {
    console.log(userId)
    try {
      const user = await this.user.findOne({ _id: userId })

      if (user) {
        if (user.userType === 'admin') {

          const tution = await this.tution.aggregate([
            { $match: { 'status': value } },
          ])
          if (tution.length === 0) {
            throw new NotFoundException({
              message: 'Tution not found', data: null,
              statusCode: 400
            })
          }
          else {
            return {
              message: 'Tution found.',
              statusCode: 200,
              data: tution
            }
          }
        }
        else {
          throw new NotFoundException({
            message: 'Only admin can access this.', data: null,
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
      console.log(error)

      return error.response
    }
  }


}
