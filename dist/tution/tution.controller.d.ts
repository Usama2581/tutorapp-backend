import { TutionService } from './tution.service';
export declare class TutionController {
    private readonly tutionService;
    constructor(tutionService: TutionService);
    create(body: any): any;
    findAll(): any;
    findUserTution(id: any): any;
    findTutionIfProposalExsis(userId: any, tutionId: any): any;
    updateTution(userId: any, tutionId: any, body: any): any;
    getTutionByStatus(value: any, userId: any): Promise<any>;
}
