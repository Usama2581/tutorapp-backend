import { CommisionService } from './commision.service';
export declare class CommisionController {
    private readonly commisionService;
    constructor(commisionService: CommisionService);
    update(body: any): any;
    getSum(value: any, id: any): any;
}
