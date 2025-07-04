"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBookModule = void 0;
const common_1 = require("@nestjs/common");
const borrow_book_controller_1 = require("./borrow-book.controller");
const borrow_book_service_1 = require("./borrow-book.service");
const mongoose_1 = require("@nestjs/mongoose");
const borrow_book_schema_1 = require("./schemas/borrow-book.schema");
const book_module_1 = require("../book/book.module");
const membership_module_1 = require("../membership/membership.module");
let BorrowBookModule = class BorrowBookModule {
};
exports.BorrowBookModule = BorrowBookModule;
exports.BorrowBookModule = BorrowBookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: borrow_book_schema_1.BorrowBook.name, schema: borrow_book_schema_1.BorrowBookSchema },
            ]),
            book_module_1.BookModule,
            membership_module_1.MembershipModule,
        ],
        controllers: [borrow_book_controller_1.BorrowBookController],
        providers: [borrow_book_service_1.BorrowBookService],
    })
], BorrowBookModule);
//# sourceMappingURL=borrow-book.module.js.map