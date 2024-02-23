import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose/dist/interfaces";
export declare class DBService implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
