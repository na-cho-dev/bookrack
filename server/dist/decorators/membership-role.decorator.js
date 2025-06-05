"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipRoles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
const MembershipRoles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.MembershipRoles = MembershipRoles;
//# sourceMappingURL=membership-role.decorator.js.map