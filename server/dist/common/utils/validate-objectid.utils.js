"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = validateObjectId;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
function validateObjectId(id) {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new common_1.BadRequestException(`Invalid ObjectId: ${id}`);
    }
}
//# sourceMappingURL=validate-objectid.utils.js.map