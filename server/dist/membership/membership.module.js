"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipModule = void 0;
const common_1 = require("@nestjs/common");
const membership_service_1 = require("./membership.service");
const membership_controller_1 = require("./membership.controller");
const mongoose_1 = require("@nestjs/mongoose");
const membership_schema_1 = require("./schemas/membership.schema");
const user_module_1 = require("../user/user.module");
let MembershipModule = class MembershipModule {
};
exports.MembershipModule = MembershipModule;
exports.MembershipModule = MembershipModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: membership_schema_1.Membership.name, schema: membership_schema_1.MembershipSchema },
            ]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [membership_service_1.MembershipService],
        controllers: [membership_controller_1.MembershipController],
        exports: [membership_service_1.MembershipService],
    })
], MembershipModule);
//# sourceMappingURL=membership.module.js.map