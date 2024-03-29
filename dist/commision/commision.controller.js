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
exports.CommisionController = void 0;
const common_1 = require("@nestjs/common");
const commision_service_1 = require("./commision.service");
let CommisionController = class CommisionController {
    constructor(commisionService) {
        this.commisionService = commisionService;
    }
    update(body) {
        try {
            return this.commisionService.update(body);
        }
        catch (error) {
            return error.response;
        }
    }
    getSum(value, id) {
        try {
            return this.commisionService.sum(value, id);
        }
        catch (error) {
            return error.response;
        }
    }
};
exports.CommisionController = CommisionController;
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommisionController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/sum'),
    __param(0, (0, common_1.Query)('value')),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CommisionController.prototype, "getSum", null);
exports.CommisionController = CommisionController = __decorate([
    (0, common_1.Controller)('commision'),
    __metadata("design:paramtypes", [commision_service_1.CommisionService])
], CommisionController);
//# sourceMappingURL=commision.controller.js.map