/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { TutionDocument } from './entities/tution.entity';
import { Model } from 'mongoose';
import { UserDocument } from '../user/entities/user.entity';
import { CommisionDocument } from 'src/commision/entities/commision.entity';
import { ProposalDocument } from 'src/proposal/entities/proposal.entity';
export declare class TutionService {
    private user;
    private commision;
    private proposal;
    private tution;
    constructor(user: Model<UserDocument>, commision: Model<CommisionDocument>, proposal: Model<ProposalDocument>, tution: Model<TutionDocument>);
    findUser(user: any): any;
    postTution(body: any): Promise<any>;
    find(): Promise<any>;
    findUserTution(id: any): Promise<any>;
    findTutionIfProposalExsist(userId: any, tutionId: any): Promise<any>;
    updateTution(userId: any, tutionId: any, body: any): Promise<any>;
    getTutionByStatus(value: any, userId: any): Promise<any>;
    deleteTution(id: any): Promise<any>;
}
