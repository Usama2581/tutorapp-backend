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
import { ProposalDocument } from './entities/proposal.entity';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entities/user.entity';
import { TutionDocument } from 'src/tution/entities/tution.entity';
export declare class ProposalService {
    private proposal;
    private user;
    private tution;
    constructor(proposal: Model<ProposalDocument>, user: Model<UserDocument>, tution: Model<TutionDocument>);
    create(body: any): Promise<any>;
    getProposals(id: any): Promise<any>;
    acceptProposal(body: any): Promise<any>;
    rejectProposal(body: any): Promise<any>;
    updateProposal(userId: any, tutionId: any, body: any): Promise<any>;
    getProposalByStatus(value: any, userId: any): Promise<any>;
    deleteProposal(id: any): Promise<any>;
    findAllProposalsOfUser(id: any): Promise<{
        message: string;
        statusCode: number;
        data: Omit<Omit<import("mongoose").Document<unknown, {}, ProposalDocument> & import("./entities/proposal.entity").Proposal & Document & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
    }>;
}
