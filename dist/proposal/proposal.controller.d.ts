import { ProposalService } from './proposal.service';
export declare class ProposalController {
    private readonly proposalService;
    constructor(proposalService: ProposalService);
    create(body: any): any;
    getProposals(id: any): any;
    acceptProposal(body: any): any;
    rejectProposal(body: any): any;
    updateProposal(body: any, userId: any, tutionId: any): any;
    getProposalByStatus(value: any, userId: any, tutionId: any): Promise<any>;
    deleteProposal(id: any): any;
}
