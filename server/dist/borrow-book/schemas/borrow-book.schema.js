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
exports.BorrowBookSchema = exports.BorrowBook = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const book_schema_1 = require("../../book/schemas/book.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
let BorrowBook = class BorrowBook {
    user;
    book;
    requestAt;
    borrowDate;
    dueDate;
    returnDate;
    status;
};
exports.BorrowBook = BorrowBook;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], BorrowBook.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Book', required: true }),
    __metadata("design:type", book_schema_1.Book)
], BorrowBook.prototype, "book", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BorrowBook.prototype, "requestAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BorrowBook.prototype, "borrowDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BorrowBook.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BorrowBook.prototype, "returnDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], BorrowBook.prototype, "status", void 0);
exports.BorrowBook = BorrowBook = __decorate([
    (0, mongoose_1.Schema)()
], BorrowBook);
exports.BorrowBookSchema = mongoose_1.SchemaFactory.createForClass(BorrowBook);
exports.BorrowBookSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
exports.BorrowBookSchema.set('toObject', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
//# sourceMappingURL=borrow-book.schema.js.map