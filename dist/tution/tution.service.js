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
exports.TutionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tution_entity_1 = require("./entities/tution.entity");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const commision_entity_1 = require("../commision/entities/commision.entity");
const proposal_entity_1 = require("../proposal/entities/proposal.entity");
let TutionService = class TutionService {
    constructor(user, commision, proposal, tution) {
        this.user = user;
        this.commision = commision;
        this.proposal = proposal;
        this.tution = tution;
    }
    findUser(user) {
        try {
            return this.user.findOne({ _id: user });
        }
        catch (error) {
            return error.response;
        }
    }
    async postTution(body) {
        try {
            const user = await this.findUser(body.user);
            if (user) {
                if (user.userType === 'student') {
                    const commision = await this.commision.find();
                    const newBody = { ...body, commision: commision[0].percentage };
                    const tution = await this.tution.create(newBody);
                    return {
                        message: 'posted',
                        statusCode: 200,
                        data: tution
                    };
                }
                else {
                    throw new common_1.NotFoundException({
                        message: 'only sudents can post tution', data: null,
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
    async find() {
        try {
            const tution = await this.tution.find().populate('user');
            if (tution.length == 0) {
                throw new common_1.BadRequestException({
                    message: 'Tutions not found.', data: null,
                    statusCode: 400
                });
            }
            else {
                return {
                    message: 'tutions..',
                    statusCode: 200,
                    data: tution
                };
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async findUserTution(id) {
        try {
            const user = await this.findUser(id);
            if (user) {
                const tution = await this.tution.find({ user: id });
                if (tution.length === 0) {
                    throw new common_1.ServiceUnavailableException({
                        message: 'No tutions found.', data: null,
                        statusCode: 400
                    });
                }
                else {
                    return {
                        message: 'tutions',
                        statusCode: 200,
                        data: tution
                    };
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
    async findTutionIfProposalExsist(userId, tutionId) {
        try {
            const user = await this.user.findById({ _id: userId });
            if (user) {
                if (user.userType === 'student') {
                    const tution = await this.tution.find({
                        $and: [
                            { user: { $eq: userId } },
                            { proposalsReceived: { $eq: true } }
                        ]
                    });
                    if (tution) {
                        if (tution.length === 0) {
                            throw new common_1.NotFoundException({
                                message: 'tutions not found.',
                                data: null,
                                statusCode: 400
                            });
                        }
                        else {
                            return {
                                message: 'Tution found',
                                statusCode: 200,
                                data: tution
                            };
                        }
                    }
                    else {
                        throw new common_1.NotFoundException({
                            message: 'tution doesnot exsist.', data: null,
                            statusCode: 400
                        });
                    }
                }
                else {
                    throw new common_1.ServiceUnavailableException({
                        message: 'only students can access this.', data: null,
                        statusCode: 400
                    });
                }
            }
            else {
                throw new common_1.ServiceUnavailableException({
                    message: 'user not found.', data: null,
                    statusCode: 400
                });
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async updateTution(userId, tutionId, body) {
        try {
            const user = await this.user.findOne({ _id: userId });
            if (user) {
                if (user.userType === 'student') {
                    const tution = await this.tution.findOne({ _id: tutionId });
                    if (tution) {
                        const result = await this.tution.findByIdAndUpdate({ _id: tution._id }, body, { new: true });
                        return {
                            message: 'tution updated',
                            statusCode: 200,
                            data: result
                        };
                    }
                    else {
                        throw new common_1.NotFoundException({
                            message: 'tutin not found', data: null,
                            statusCode: 400
                        });
                    }
                }
                else {
                    throw new common_1.NotFoundException({
                        message: 'only student can access this.', data: null,
                        statusCode: 400
                    });
                }
            }
            else {
                throw new common_1.NotFoundException({
                    message: 'user not found', data: null,
                    statusCode: 400
                });
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async getTutionByStatus(value, userId) {
        console.log(userId);
        try {
            const user = await this.user.findOne({ _id: userId });
            if (user) {
                if (user.userType === 'admin') {
                    const tution = await this.tution.aggregate([
                        { $match: { 'status': value } },
                    ]);
                    if (tution.length === 0) {
                        throw new common_1.NotFoundException({
                            message: 'Tution not found', data: null,
                            statusCode: 400
                        });
                    }
                    else {
                        return {
                            message: 'Tution found.',
                            statusCode: 200,
                            data: tution
                        };
                    }
                }
                else {
                    throw new common_1.NotFoundException({
                        message: 'Only admin can access this.', data: null,
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
            console.log(error);
            return error.response;
        }
    }
};
exports.TutionService = TutionService;
exports.TutionService = TutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.UserModel)),
    __param(1, (0, mongoose_1.InjectModel)(commision_entity_1.CommisionModel)),
    __param(2, (0, mongoose_1.InjectModel)(proposal_entity_1.ProposalModel)),
    __param(3, (0, mongoose_1.InjectModel)(tution_entity_1.TutionModel)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TutionService);
//# sourceMappingURL=tution.service.js.map