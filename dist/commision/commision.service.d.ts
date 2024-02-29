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
import { CommisionDocument } from './entities/commision.entity';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entities/user.entity';
export declare class CommisionService {
    private commision;
    private user;
    constructor(commision: Model<CommisionDocument>, user: Model<UserDocument>);
    update(body: any): Promise<any>;
    sum(value: any, id: any): Promise<any>;
    create(): Promise<import("mongoose").Document<unknown, {}, CommisionDocument> & import("./entities/commision.entity").Commision & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
