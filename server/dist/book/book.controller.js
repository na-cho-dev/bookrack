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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const create_book_dto_1 = require("./dto/create-book.dto");
const book_service_1 = require("./book.service");
const update_book_dto_1 = require("./dto/update-book.dto");
const membership_role_guard_1 = require("../guards/membership-role.guard");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const membership_role_decorator_1 = require("../decorators/membership-role.decorator");
const swagger_1 = require("@nestjs/swagger");
const membership_schema_1 = require("../membership/schemas/membership.schema");
let BookController = class BookController {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
    }
    async addBook(bookDto) {
        const book = await this.bookService.addBook(bookDto);
        return {
            message: 'Book added successfully',
            book,
        };
    }
    async getAllBooks() {
        const books = await this.bookService.getAllBooks();
        return {
            message: 'Books retrieved successfully',
            books,
        };
    }
    async getBookById(id) {
        const book = await this.bookService.getBookById(id);
        return {
            message: 'Book retrieved successfully',
            book,
        };
    }
    async updateBook(id, bookDto) {
        const updatedBook = await this.bookService.updateBookById(id, bookDto);
        return {
            message: 'Book updated successfully',
            book: updatedBook,
        };
    }
    async deleteBook(id) {
        const deletedBook = await this.bookService.deleteBookById(id);
        return {
            message: 'Book deleted successfully',
            book: deletedBook,
        };
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Post)(),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.AddBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addBook", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, swagger_1.ApiCookieAuth)('Authentication'),
    (0, common_1.Controller)('books'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, membership_role_guard_1.MembershipRoleGuard),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map