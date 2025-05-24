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
exports.UpdateBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateBookDto {
    isbn;
    title;
    author;
    publishedYear;
    genre;
}
exports.UpdateBookDto = UpdateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ISBN of the book',
        example: '978-3-16-148410-0',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsISBN)(13),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "isbn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the book',
        example: 'The Great Gatsby',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The author of the book',
        example: 'F. Scott Fitzgerald',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The year the book was published',
        example: 1925,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateBookDto.prototype, "publishedYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The genre of the book',
        example: 'Fiction',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "genre", void 0);
//# sourceMappingURL=update-book.dto.js.map