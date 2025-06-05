"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membership = void 0;
const common_1 = require("@nestjs/common");
exports.Membership = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const membership = req.membership;
    if (!data)
        return membership;
    return membership?.[data];
});
//# sourceMappingURL=membership.decorator.js.map