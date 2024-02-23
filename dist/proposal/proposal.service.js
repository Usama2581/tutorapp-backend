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
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const proposal_entity_1 = require("./entities/proposal.entity");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const tution_entity_1 = require("../tution/entities/tution.entity");
let ProposalService = class ProposalService {
    constructor(proposal, user, tution) {
        this.proposal = proposal;
        this.user = user;
        this.tution = tution;
    }
    async create(body) {
        try {
            const user = await this.user.findOne({ _id: body.user });
            if (user) {
                if (user.userType === 'teacher') {
                    if (body.amount >= 0) {
                        const tution = await this.tution.findOne({ _id: body.tution });
                        const proposal = await this.proposal.findOne({
                            $and: [{ user: { $eq: body.user } },
                                { tution: { $eq: body.tution } }]
                        });
                        if (tution) {
                            if (!proposal) {
                                const newProposal = await this.proposal.create(body);
                                const updatedTution = await this.tution.findByIdAndUpdate({ _id: tution._id }, { proposalsReceived: true }, { new: true });
                                return {
                                    message: 'Proposal submitted.',
                                    statusCode: 200,
                                    proposal: newProposal,
                                    updatedTution
                                };
                            }
                            else {
                                throw new common_1.ConflictException('you cannot apply again.');
                            }
                        }
                        else {
                            throw new common_1.NotFoundException('Tution does not exsist.');
                        }
                    }
                    else {
                        throw new common_1.ServiceUnavailableException(`Invalid amount ${body.amount}`);
                    }
                }
                else {
                    throw new common_1.ServiceUnavailableException('Only teachers can add proposal.');
                }
            }
            else {
                throw new common_1.NotFoundException('User not found.');
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async getProposals(id) {
        try {
            const tution = await this.tution.findById(id);
            if (tution) {
                const proposal = await this.proposal.find({ tution: id });
                if (proposal.length === 0) {
                    throw new common_1.BadRequestException('No proposals found.');
                }
                else {
                    return {
                        statusCode: 200,
                        proposal
                    };
                }
            }
            else {
                throw new common_1.NotFoundException('Tution not found.');
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async acceptProposal(body) {
        try {
            const student = await this.user.findOne({ _id: body.studentId });
            if (student) {
                const teacher = await this.user.findOne({ _id: body.teacherId });
                if (teacher) {
                    const tution = await this.tution.findOne({ _id: body.tution });
                    if (tution) {
                        const proposal = await this.proposal.findOne({ tution: body.tution, user: body.teacherId });
                        if (proposal) {
                            const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, { status: 'accepted' }, { new: true });
                            return newProposal;
                        }
                        else {
                            throw new common_1.NotFoundException('Proposal not found.');
                        }
                    }
                    else {
                        throw new common_1.NotFoundException('Tution not found.');
                    }
                }
                else {
                    throw new common_1.NotFoundException('Teacher not found');
                }
            }
            else {
                throw new common_1.NotFoundException('Student not found');
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async rejectProposal(body) {
        try {
            const student = await this.user.findOne({ _id: body.studentId });
            if (student) {
                const teacher = await this.user.findOne({ _id: body.teacherId });
                if (teacher) {
                    const tution = await this.tution.findOne({ _id: body.tution });
                    if (tution) {
                        const proposal = await this.proposal.findOne({ tution: body.tution, user: body.teacherId });
                        if (proposal) {
                            const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, { status: 'rejected' }, { new: true });
                            return {
                                message: 'Proposal rejected',
                                statusCode: 200,
                                newProposal
                            };
                        }
                        else {
                            throw new common_1.NotFoundException('Proposal not found.');
                        }
                    }
                    else {
                        throw new common_1.NotFoundException('Tution not found.');
                    }
                }
                else {
                    throw new common_1.NotFoundException('Teacher not found');
                }
            }
            else {
                throw new common_1.NotFoundException('Student not found');
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async updateProposal(userId, tutionId, body) {
        try {
            const user = await this.user.findOne({ _id: userId });
            if (user) {
                if (user.userType === 'teacher') {
                    const tution = await this.tution.findOne({ _id: tutionId });
                    if (tution) {
                        const proposal = await this.proposal.findOne({ tution: tutionId, user: userId });
                        if (proposal) {
                            const newProposal = await this.proposal.findByIdAndUpdate({ _id: proposal._id }, body, { new: true });
                            return {
                                message: 'Proposal updated',
                                statusCode: 200,
                                newProposal
                            };
                        }
                        else {
                            throw new common_1.NotFoundException('Your proposal not found');
                        }
                    }
                    else {
                        throw new common_1.NotFoundException("Tution not found.");
                    }
                }
                else {
                    throw new common_1.NotFoundException("Only teachers can write and update proposals.");
                }
            }
            else {
                throw new common_1.NotFoundException("User not found.");
            }
        }
        catch (error) {
            return error.response;
        }
    }
    async getProposalByStatus(value, userId, tutionId) {
        console.log(userId);
        try {
            const user = await this.user.findOne({ _id: userId });
            if (user) {
                if (user.userType === 'admin') {
                    const tution = await this.tution.findOne({ _id: tutionId });
                    if (tution) {
                        const proposals = await this.proposal.aggregate([
                            { $match: { 'status': value } },
                            { $match: { 'tution': tutionId } }
                        ]);
                        if (proposals.length === 0) {
                            throw new common_1.NotFoundException('proposals not found');
                        }
                        else {
                            return {
                                statusCode: 200,
                                message: 'Proposals found',
                                proposals
                            };
                        }
                    }
                    else {
                        throw new common_1.NotFoundException('Tution not found.');
                    }
                }
                else {
                    throw new common_1.NotFoundException('Only admin can access this.');
                }
            }
            else {
                throw new common_1.NotFoundException('User not found.');
            }
        }
        catch (error) {
            console.log(error);
            return error.response;
        }
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(proposal_entity_1.ProposalModel)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.UserModel)),
    __param(2, (0, mongoose_1.InjectModel)(tution_entity_1.TutionModel)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProposalService);
//# sourceMappingURL=proposal.service.js.map