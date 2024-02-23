"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalModule = void 0;
const common_1 = require("@nestjs/common");
const proposal_service_1 = require("./proposal.service");
const proposal_controller_1 = require("./proposal.controller");
const proposal_entity_1 = require("./entities/proposal.entity");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const tution_entity_1 = require("../tution/entities/tution.entity");
let ProposalModule = class ProposalModule {
};
exports.ProposalModule = ProposalModule;
exports.ProposalModule = ProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: proposal_entity_1.ProposalModel, schema: proposal_entity_1.ProposalSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_entity_1.UserModel, schema: user_entity_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: tution_entity_1.TutionModel, schema: tution_entity_1.TutionSchema }]),
        ],
        controllers: [proposal_controller_1.ProposalController],
        providers: [proposal_service_1.ProposalService],
    })
], ProposalModule);
//# sourceMappingURL=proposal.module.js.map