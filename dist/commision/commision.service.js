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
exports.CommisionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const commision_entity_1 = require("./entities/commision.entity");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../user/entities/user.entity");
let CommisionService = class CommisionService {
    constructor(commision, user) {
        this.commision = commision;
        this.user = user;
    }
    async update(body) {
        try {
            const user = await this.user.findOne({ email: body.email });
            if (user) {
                if (user.userType == 'admin') {
                    const data = await this.commision.find();
                    const { _id } = data[0];
                    const newCommision = await this.commision.findByIdAndUpdate(_id, { percentage: body.percentage }, { new: true });
                    return {
                        message: 'Commision updated',
                        statusCode: 200,
                        data: newCommision
                    };
                }
                else {
                    throw new common_1.UnauthorizedException({
                        message: 'Only admin can update commision.', data: null,
                        statusCode: 400
                    });
                }
            }
            else {
                throw new common_1.NotFoundException({
                    message: 'User not found.', data: null,
                    statusCode: 400
                });
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async sum(value, id) {
        try {
            console.log(value);
            const user = await this.user.findById(id);
            if (user) {
                if (user.userType === 'admin') {
                    const data = await this.user.countDocuments({ 'userType': value });
                    if (data) {
                        return {
                            message: `Total ${value} are ${data}`,
                            statusCode: 200,
                            data
                        };
                    }
                    else {
                        throw new common_1.NotFoundException({
                            message: `${value} Not found`, data: null,
                            statusCode: 400
                        });
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
exports.CommisionService = CommisionService;
exports.CommisionService = CommisionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(commision_entity_1.CommisionModel)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.UserModel)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommisionService);
//# sourceMappingURL=commision.service.js.map