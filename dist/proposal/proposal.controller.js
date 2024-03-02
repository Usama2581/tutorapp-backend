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
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const proposal_service_1 = require("./proposal.service");
let ProposalController = class ProposalController {
    constructor(proposalService) {
        this.proposalService = proposalService;
    }
    create(body) {
        try {
            return this.proposalService.create(body);
        }
        catch (error) {
            return error.response;
        }
    }
    getProposals(id) {
        try {
            return this.proposalService.getProposals(id);
        }
        catch (error) {
            return error.response;
        }
    }
    acceptProposal(body) {
        try {
            return this.proposalService.acceptProposal(body);
        }
        catch (error) {
            return error.response;
        }
    }
    rejectProposal(body) {
        try {
            return this.proposalService.rejectProposal(body);
        }
        catch (error) {
            return error.response;
        }
    }
    updateProposal(body, userId, tutionId) {
        try {
            return this.proposalService.updateProposal(userId, tutionId, body);
        }
        catch (error) {
            return error.response;
        }
    }
    async getProposalByStatus(value, userId) {
        try {
            return await this.proposalService.getProposalByStatus(value, userId);
        }
        catch (error) {
            console.log(error);
            return error.response;
        }
    }
    deleteProposal(id) {
        try {
            return this.proposalService.deleteProposal(id);
        }
        catch (error) {
            return error.response;
        }
    }
    findAllProposalOfUser(id) {
        try {
            return this.proposalService.findAllProposalsOfUser(id);
        }
        catch (error) {
            return error.response;
        }
    }
    findAllProposalOfTeacher(id) {
        try {
            return this.proposalService.findAllProposalsOfTeacher(id);
        }
        catch (error) {
            return error.response;
        }
    }
};
exports.ProposalController = ProposalController;
__decorate([
    (0, common_1.Post)('/post'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "getProposals", null);
__decorate([
    (0, common_1.Put)('/accept'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "acceptProposal", null);
__decorate([
    (0, common_1.Put)('/reject'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "rejectProposal", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('userId')),
    __param(2, (0, common_1.Query)('tutionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "updateProposal", null);
__decorate([
    (0, common_1.Get)('/status'),
    __param(0, (0, common_1.Query)('value')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "getProposalByStatus", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "deleteProposal", null);
__decorate([
    (0, common_1.Get)('/findAll/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findAllProposalOfUser", null);
__decorate([
    (0, common_1.Get)('/find/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findAllProposalOfTeacher", null);
exports.ProposalController = ProposalController = __decorate([
    (0, common_1.Controller)('proposal'),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService])
], ProposalController);
//# sourceMappingURL=proposal.controller.js.map