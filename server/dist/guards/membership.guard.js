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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipGuard = void 0;
const common_1 = require("@nestjs/common");
const membership_service_1 = require("../membership/membership.service");
let MembershipGuard = class MembershipGuard {
    membershipService;
    constructor(membershipService) {
        this.membershipService = membershipService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const orgId = req.headers['x-organization-id'];
        if (!orgId) {
            throw new common_1.BadRequestException('Organization ID is required.');
        }
        const membership = await this.membershipService.findOne({
            user: String(user._id),
            organization: String(orgId),
        });
        if (!membership)
            throw new common_1.ForbiddenException('User is not a member of this organization.');
        req.membership = membership;
        return true;
    }
};
exports.MembershipGuard = MembershipGuard;
exports.MembershipGuard = MembershipGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [membership_service_1.MembershipService])
], MembershipGuard);
//# sourceMappingURL=membership.guard.js.map