import { BadRequestException, ConflictException, Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProposalDocument, ProposalModel } from './entities/proposal.entity';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from 'src/user/entities/user.entity';
import { TutionDocument, TutionModel } from 'src/tution/entities/tution.entity';


@Injectable()
export class ProposalService {

  constructor(
    @InjectModel(ProposalModel) private proposal: Model<ProposalDocument>,
    @InjectModel(UserModel) private user: Model<UserDocument>,
    @InjectModel(TutionModel) private tution: Model<TutionDocument>,
  ) { }

  async create(body) {
    try {
      const user = await this.user.findOne({ _id: body.user })
      if (user) {

        if (user.userType === 'teacher') {

          if (body.amount >= 0) {

            const tution = await this.tution.findOne({ _id: body.tution })
            const proposal = await this.proposal.findOne({
              $and:
                [{ user: { $eq: body.user } },
                { tution: { $eq: body.tution } }]
            })
            if (tution) {
              if (!proposal) {

                const newProposal = await this.proposal.create(body)
                const updatedTution = await this.tution.findByIdAndUpdate({ _id: tution._id }, { proposalsReceived: true }, { new: true })


                return {
                  message: 'Proposal submitted.',
                  statusCode: 200,
                  // data: newProposal,
                  data: updatedTution
                }
              }
              else {
                throw new ConflictException({
                  message: 'you cannot apply again.', data: null,
                  statusCode: 400
                })
              }
            }
            else {
              throw new NotFoundException({
                message: 'Tution does not exsist.', data: null,
                statusCode: 400
              })
            }

          }
          else {
            throw new ServiceUnavailableException({
              message: `Invalid amount ${body.amount}`, data: null,
              statusCode: 400
            })
          }
        }
        else {
          throw new ServiceUnavailableException({
            message: 'Only teachers can add proposal.',
            data: null,
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

  async getProposals(id) {
    try {

      const tution = await this.tution.findById(id)

      if (tution) {
        const proposal = await this.proposal.find({ tution: id })
        if (proposal.length === 0) {
          throw new BadRequestException({
            message: 'No proposals found.', data: null,
            statusCode: 400
          })
        }
        else {
          return {
            message: 'proposals',
            statusCode: 200,
            data: proposal
          }
        }
      }
      else {
        throw new NotFoundException({
          message: 'Tution not found.', data: null,
          statusCode: 400
        })
      }
    } catch (error) {
      return error.response
    }
  }

  async acceptProposal(body) {
    try {
      const student = await this.user.findOne({ _id: body.studentId })
      if (student) {
        const teacher = await this.user.findOne({ _id: body.teacherId })
        if (teacher) {
          const tution = await this.tution.findOne({ _id: body.tution })
          if (tution) {
            const proposal = await this.proposal.findOne({ tution: body.tution, user: body.teacherId })
            if (proposal) {
              const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, { status: 'accepted' }, { new: true })
              return {
                message: 'propsal accepted ',
                statusCode: 200,
                data: newProposal
              }
            }
            else {
              throw new NotFoundException({
                message: 'Proposal not found.', data: null,
                statusCode: 400
              })
            }
          }
          else {
            throw new NotFoundException({
              message: 'Tution not found.', data: null,
              statusCode: 400
            })
          }
        }
        else {
          throw new NotFoundException({
            message: 'Teacher not found', data: null,
            statusCode: 400
          })
        }
      }
      else {
        throw new NotFoundException({
          message: 'Student not found', data: null,
          statusCode: 400
        })
      }
    } catch (error) {
      return error.response
    }
  }

  async rejectProposal(body) {
    try {
      const student = await this.user.findOne({ _id: body.studentId })
      if (student) {
        const teacher = await this.user.findOne({ _id: body.teacherId })
        if (teacher) {
          const tution = await this.tution.findOne({ _id: body.tution })
          if (tution) {
            const proposal = await this.proposal.findOne({ tution: body.tution, user: body.teacherId })
            if (proposal) {
              const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, { status: 'rejected' }, { new: true })
              return {
                message: 'Proposal rejected',
                statusCode: 200,
                newProposal
              }
            }
            else {
              throw new NotFoundException('Proposal not found.')
            }
          }
          else {
            throw new NotFoundException('Tution not found.')
          }
        }
        else {
          throw new NotFoundException('Teacher not found')
        }
      }
      else {
        throw new NotFoundException('Student not found')
      }
    } catch (error) {
      return error.response
    }
  }

  async updateProposal(userId, tutionId, body) {
    try {
      const user = await this.user.findOne({ _id: userId })
      if (user) {
        if (user.userType === 'teacher') {
          const tution = await this.tution.findOne({ _id: tutionId })
          if (tution) {
            const proposal = await this.proposal.findOne({ tution: tutionId, user: userId })

            if (proposal) {
              const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, body, { new: true })
              return {
                message: 'Proposal updated',
                statusCode: 200,
                data: newProposal
              }
            }
            else {
              throw new NotFoundException({
                message: 'Your proposal not found', data: null,
                statusCode: 400
              })
            }
          }
          else {
            throw new NotFoundException({
              message: "Tution not found.", data: null,
              statusCode: 400
            })
          }
        }
        else {
          throw new NotFoundException({
            message: "Only teachers can write and update proposals.", data: null,
            statusCode: 400
          })
        }
      }
      else {
        throw new NotFoundException({
          message: "User not found.", data: null,
          statusCode: 400
        })
      }
    } catch (error) {
      return error.response
    }
  }

  async getProposalByStatus(value, userId, tutionId) {
    console.log(userId)
    try {
      const user = await this.user.findOne({ _id: userId })
      if (user) {
        if (user.userType === 'admin') {
          const tution = await this.tution.findOne({ _id: tutionId })
          if (tution) {
            const proposals = await this.proposal.aggregate([
              { $match: { 'status': value } },
              { $match: { 'tution': tutionId } }
            ])

            if (proposals.length === 0) {
              throw new NotFoundException({
                message: 'proposals not found', data: null,
                statusCode: 400
              })
            }
            else {
              return {
                statusCode: 200,
                message: 'Proposals found',
                data: proposals
              }
            }
          }
          else {
            throw new NotFoundException({
              message: 'Tution not found.', data: null,
              statusCode: 400
            })
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

