import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDocument, UserModel } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(UserModel) private user: Model<UserDocument>,
    private jwtService: JwtService) {
    // console.log(category, account)
  }

  async register(body) {
    const user = await this.user.findOne({ email: body.email })
    if (user) {
      throw new NotFoundException({
        message: "user already exsist", data: null,
        statusCode: 400
      })
    }
    else {
      const user = await this.user.create(body)
      return {
        message: 'User registered',
        statusCode: 200,
        data: user
      }
    }
  }

  async login(body) {
    try {
      try {
        var user = await this.user.findOne({ email: body.email })

      } catch (error) {
        console.log(error)
      }
      if (!user) {
        // console.log('1');
        throw new NotFoundException({
          message: 'User not found.', data: null,
          statusCode: 400
        })
      }

      const result = await bcrypt.compare(body.password, user.password)
      // console.log(result)

      if (!result) {
        //  console.log('2');
        throw new BadRequestException({
          message: 'Email or password is incorrect.',
          data: null,
          statusCode: 400
        })
      }

      else {
        const payload = { sub: user.password, username: user.name }
        const token = await this.jwtService.signAsync(payload)
        // console.log(token)
        return {
          token,
          user
        }
      }

    } catch (error) {
      // console.log(error)
      return error.response
    }
  }

  async get(value, id) {
    try {
      console.log(value)
      const user = await this.user.findById(id)
      if (user) {
        if (user.userType === 'admin') {
          const data = await this.user.find({ 'userType': value })
          if (data.length === 0) {
            throw new NotFoundException({
              message: `${value} Not found`,
              data: null,
              statusCode: 400
            })
          }
          else {
            return {
              message: `total ${value} are`,
              statusCode: 200,
              data,
            }
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

}
