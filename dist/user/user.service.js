"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const mongoose_1 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(user, jwtService) {
        this.user = user;
        this.jwtService = jwtService;
    }
    async register(body) {
        const user = await this.user.findOne({ email: body.email });
        if (user) {
            throw new common_1.NotFoundException({
                message: "user already exsist", data: null,
                statusCode: 400
            });
        }
        else {
            const user = await this.user.create(body);
            return {
                message: 'User registered',
                statusCode: 200,
                data: user
            };
        }
    }
    async login(body) {
        try {
            try {
                var user = await this.user.findOne({ email: body.email });
            }
            catch (error) {
                console.log(error);
            }
            if (!user) {
                throw new common_1.NotFoundException({
                    message: 'User not found.', data: null,
                    statusCode: 400
                });
            }
            const result = await bcrypt.compare(body.password, user.password);
            if (!result) {
                throw new common_1.BadRequestException({
                    message: 'Email or password is incorrect.',
                    data: null,
                    statusCode: 400
                });
            }
            else {
                const payload = { sub: user.password, username: user.name };
                const token = await this.jwtService.signAsync(payload);
                return {
                    token,
                    user
                };
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async get(value, id) {
        try {
            console.log(value);
            const user = await this.user.findById(id);
            if (user) {
                if (user.userType === 'admin') {
                    const data = await this.user.find({ 'userType': value });
                    if (data.length === 0) {
                        throw new common_1.NotFoundException({
                            message: `${value} Not found`,
                            data: null,
                            statusCode: 400
                        });
                    }
                    else {
                        return {
                            message: `total ${value} are`,
                            statusCode: 200,
                            data,
                        };
                    }
                }
                else {
                    throw new common_1.UnauthorizedException({
                        message: 'Only admin can access.', data: null,
                        statusCode: 400
                    });
                }
            }
            else {
                throw new common_1.NotFoundException({
                    message: 'User not  found.', data: null,
                    statusCode: 400
                });
            }
        }
        catch (error) {
            return error.response;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_entity_1.UserModel)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map