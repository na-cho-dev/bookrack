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
exports.MembershipSchema = exports.Membership = exports.MembershipRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const organization_shema_1 = require("../../organization/schemas/organization.shema");
const user_schema_1 = require("../../user/schemas/user.schema");
var MembershipRole;
(function (MembershipRole) {
    MembershipRole["ADMIN"] = "admin";
    MembershipRole["STAFF"] = "staff";
    MembershipRole["USER"] = "user";
})(MembershipRole || (exports.MembershipRole = MembershipRole = {}));
let Membership = class Membership {
    user;
    organization;
    role;
    status;
    createdAt;
};
exports.Membership = Membership;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Membership.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: organization_shema_1.Organization.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Membership.prototype, "organization", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: MembershipRole, required: true }),
    __metadata("design:type", String)
], Membership.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], Membership.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Membership.prototype, "createdAt", void 0);
exports.Membership = Membership = __decorate([
    (0, mongoose_1.Schema)()
], Membership);
exports.MembershipSchema = mongoose_1.SchemaFactory.createForClass(Membership);
exports.MembershipSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
exports.MembershipSchema.set('toObject', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
//# sourceMappingURL=membership.schema.js.map