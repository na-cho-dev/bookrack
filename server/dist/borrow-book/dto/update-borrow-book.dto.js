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
exports.UpdateBorrowBookDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateBorrowBookDto {
    user;
    book;
    borrowDate;
    dueDate;
    returnDate;
    status;
}
exports.UpdateBorrowBookDto = UpdateBorrowBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user borrowing the book',
        example: '60d21b4667d0d8992e610c85',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBorrowBookDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the book being borrowed',
        example: '60d21b4667d0d8992e610c86',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBorrowBookDto.prototype, "book", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date the book was borrowed',
        example: '2023-03-15',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBorrowBookDto.prototype, "borrowDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date the book is due',
        example: '2023-03-22',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBorrowBookDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date the book was returned',
        example: '2023-03-20',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateBorrowBookDto.prototype, "returnDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBorrowBookDto.prototype, "status", void 0);
//# sourceMappingURL=update-borrow-book.dto.js.map