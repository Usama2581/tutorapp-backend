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
exports.TutionController = void 0;
const common_1 = require("@nestjs/common");
const tution_service_1 = require("./tution.service");
let TutionController = class TutionController {
    constructor(tutionService) {
        this.tutionService = tutionService;
    }
    create(body) {
        try {
            return this.tutionService.postTution(body);
        }
        catch (error) {
            return error.response;
        }
    }
    findAll() {
        try {
            return this.tutionService.find();
        }
        catch (error) {
            return error.response;
        }
    }
    findUserTution(id) {
        try {
            return this.tutionService.findUserTution(id);
        }
        catch (error) {
            return error.response;
        }
    }
    findTutionIfProposalExsis(userId, tutionId) {
        try {
            return this.tutionService.findTutionIfProposalExsist(userId, tutionId);
        }
        catch (error) {
            return error.response;
        }
    }
    updateTution(userId, tutionId, body) {
        try {
            return this.tutionService.updateTution(userId, tutionId, body);
        }
        catch (error) {
            return error.response;
        }
    }
    async getTutionByStatus(value, userId) {
        try {
            return await this.tutionService.getTutionByStatus(value, userId);
        }
        catch (error) {
            console.log(error);
            return error.response;
        }
    }
};
exports.TutionController = TutionController;
__decorate([
    (0, common_1.Post)('/post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TutionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TutionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TutionController.prototype, "findUserTution", null);
__decorate([
    (0, common_1.Get)('/tutionIfProposalFound'),
    __param(0, (0, common_1.Query)('user')),
    __param(1, (0, common_1.Query)('tution')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TutionController.prototype, "findTutionIfProposalExsis", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Query)('user')),
    __param(1, (0, common_1.Query)('tution')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TutionController.prototype, "updateTution", null);
__decorate([
    (0, common_1.Get)('/status'),
    __param(0, (0, common_1.Query)('value')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TutionController.prototype, "getTutionByStatus", null);
exports.TutionController = TutionController = __decorate([
    (0, common_1.Controller)('tution'),
    __metadata("design:paramtypes", [tution_service_1.TutionService])
], TutionController);
//# sourceMappingURL=tution.controller.js.map