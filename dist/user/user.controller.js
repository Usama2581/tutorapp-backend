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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const register_dto_1 = require("./dto/register.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register(body) {
        try {
            return this.userService.register(body);
        }
        catch (error) {
            return error.response;
        }
    }
    async login(body, res) {
        try {
            const data = await this.userService.login(body);
            if (data.statusCode) {
                throw new common_1.NotFoundException({
                    message: 'Email or password is incorrect.', data: null,
                    statusCode: 400
                });
            }
            else {
                const { token, user } = data;
                res.cookie('jwt', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 3000),
                    sameSite: 'none',
                    secure: true
                });
                res.send({ message: 'loggedin', statusCode: 200, data: user });
            }
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: error.response.message, data: null,
                statusCode: 400
            });
        }
    }
    get(value, id) {
        try {
            return this.userService.get(value, id);
        }
        catch (error) {
            return error.response;
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Query)('value')),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "get", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map