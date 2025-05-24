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
exports.BorrowBookController = void 0;
const common_1 = require("@nestjs/common");
const borrow_book_service_1 = require("./borrow-book.service");
const create_borrow_book_dto_1 = require("./dto/create-borrow-book.dto");
const update_borrow_book_dto_1 = require("./dto/update-borrow-book.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const user_roles_guard_1 = require("../guards/user-roles.guard");
const swagger_1 = require("@nestjs/swagger");
let BorrowBookController = class BorrowBookController {
    borrowBookService;
    constructor(borrowBookService) {
        this.borrowBookService = borrowBookService;
    }
    async createBorrowRecord(borrowBookDto) {
        const borrowRecord = await this.borrowBookService.createBorrowRecord(borrowBookDto);
        return {
            message: 'Borrow record created successfully',
            data: borrowRecord,
        };
    }
    async getAllBorrowRecords() {
        const borrowRecords = await this.borrowBookService.getAllBorrowRecords();
        return {
            message: 'Borrow records retrieved successfully',
            borrowRecords,
        };
    }
    async returnBook(id) {
        const returnedBook = await this.borrowBookService.returnBook(id);
        return {
            message: 'Book returned successfully',
            returnedBook,
        };
    }
    async approveBookReturn(id) {
        const returnedBook = await this.borrowBookService.approveBookReturn(id);
        return {
            message: 'Book return has been approved successfully',
            returnedBook,
        };
    }
    async getBorrowRecordsByUserId(userId) {
        const borrowRecords = await this.borrowBookService.getBorrowRecordsByUserId(userId);
        return {
            message: 'Borrow records retrieved successfully',
            borrowRecords,
        };
    }
    async getBorrowRecordsByBookId(bookId) {
        const borrowRecords = await this.borrowBookService.getBorrowRecordsByBookId(bookId);
        return {
            message: 'Borrow records retrieved successfully',
            borrowRecords,
        };
    }
    async getUserOverdueBooks(userId) {
        const overdueBooks = await this.borrowBookService.getUserOverdueBooks(userId);
        return {
            message: 'User overdue books retrieved successfully',
            overdueBooks,
        };
    }
    async getOverdueBooks() {
        const overdueBooks = await this.borrowBookService.getOverdueBooks();
        return {
            message: 'Overdue books retrieved successfully',
            overdueBooks,
        };
    }
    async getBorrowRecordsById(id) {
        const borrowRecord = await this.borrowBookService.getBorrowRecordById(id);
        return {
            message: 'Borrow record retrieved successfully',
            borrowRecord,
        };
    }
    async updateBorrowRecordById(id, updateData) {
        const updatedBorrowRecord = await this.borrowBookService.updateBorrowRecordById(id, updateData);
        return {
            message: 'Borrow record updated successfully',
            updatedBorrowRecord,
        };
    }
    async deleteBorrowRecordById(id) {
        const deletedBorrowRecord = await this.borrowBookService.deleteBorrowRecordById(id);
        return {
            message: 'Borrow record deleted successfully',
            deletedBorrowRecord,
        };
    }
};
exports.BorrowBookController = BorrowBookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_borrow_book_dto_1.CreateBorrowBookDto]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "createBorrowRecord", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "getAllBorrowRecords", null);
__decorate([
    (0, common_1.Patch)('return/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Patch)('return/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "approveBookReturn", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "getBorrowRecordsByUserId", null);
__decorate([
    (0, common_1.Get)('book/:bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "getBorrowRecordsByBookId", null);
__decorate([
    (0, common_1.Get)('user/:userId/overdue'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "getUserOverdueBooks", null);
__decorate([
    (0, common_1.Get)('overdue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "getOverdueBooks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "getBorrowRecordsById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_borrow_book_dto_1.UpdateBorrowBookDto]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "updateBorrowRecordById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowBookController.prototype, "deleteBorrowRecordById", null);
exports.BorrowBookController = BorrowBookController = __decorate([
    (0, swagger_1.ApiTags)('Borrow Books'),
    (0, swagger_1.ApiCookieAuth)('Authentication'),
    (0, common_1.Controller)('borrow-books'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, user_roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [borrow_book_service_1.BorrowBookService])
], BorrowBookController);
//# sourceMappingURL=borrow-book.controller.js.map