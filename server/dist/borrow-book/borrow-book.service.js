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
exports.BorrowBookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const borrow_book_schema_1 = require("./schemas/borrow-book.schema");
const mongoose_2 = require("mongoose");
const validate_objectid_utils_1 = require("../common/utils/validate-objectid.utils");
const book_service_1 = require("../book/book.service");
let BorrowBookService = class BorrowBookService {
    borrowBookModel;
    bookService;
    constructor(borrowBookModel, bookService) {
        this.borrowBookModel = borrowBookModel;
        this.bookService = bookService;
    }
    async getBorrowBookQuery(query) {
        return this.borrowBookModel.find(query ?? {});
    }
    async validateBookOrganization(bookId, orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(bookId);
        const book = await this.bookService.getBookById(bookId, orgId);
        if (!book) {
            throw new common_1.BadRequestException('Book not found in this organization');
        }
        if (!book)
            throw new common_1.BadRequestException('Book does not belong to this organization');
        return book;
    }
    async createBorrowRecord(borrowBook, userId, orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(borrowBook.book);
        await this.validateBookOrganization(borrowBook.book, orgId);
        const existingRecord = await this.borrowBookModel.findOne({
            user: userId,
            book: borrowBook.book,
            status: 'borrowed',
        });
        if (existingRecord) {
            throw new common_1.BadRequestException('Borrow record already exists for this user and book');
        }
        const newBorrowRecord = new this.borrowBookModel({
            ...borrowBook,
            requestedAt: new Date(),
            user: userId,
            status: 'pending',
        });
        const savedBorrowedRecord = await newBorrowRecord.save();
        const populatedRecord = await savedBorrowedRecord.populate('user book');
        return populatedRecord;
    }
    async approveBorrowRequest(id, updateData, orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const borrowRecord = await this.borrowBookModel.findById(id);
        if (!borrowRecord)
            throw new common_1.NotFoundException('Borrow request not found');
        await this.validateBookOrganization(String(borrowRecord.book), orgId);
        if (borrowRecord.status !== 'pending')
            throw new common_1.BadRequestException('Request is not pending');
        const book = borrowRecord.book;
        await this.bookService.updateAvailableCopies(String(book._id), -1);
        const borrowDate = new Date();
        const dueDate = updateData.dueDate ||
            new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000);
        if (updateData.dueDate && dueDate < borrowDate)
            throw new common_1.BadRequestException('Due date cannot be earlier than borrow date');
        borrowRecord.set({
            status: 'borrowed',
            borrowDate,
            dueDate,
        });
        await borrowRecord.save();
        return borrowRecord;
    }
    async returnBook(id, orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const borrowRecord = await this.borrowBookModel.findById(id);
        if (!borrowRecord || borrowRecord.status === 'returned')
            throw new common_1.BadRequestException('Book is already returned or not found');
        await this.validateBookOrganization(String(borrowRecord.book), orgId);
        borrowRecord.status = 'pending-return';
        const savedBorrowRecord = await borrowRecord.save();
        const populatedRecord = await savedBorrowRecord.populate('user book');
        return populatedRecord;
    }
    async approveBookReturn(id, orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const returnedBook = await this.borrowBookModel.findById(id);
        if (!returnedBook || returnedBook.status === 'returned')
            throw new common_1.BadRequestException('Book is already returned or not found');
        await this.validateBookOrganization(String(returnedBook.book), orgId);
        returnedBook.status = 'returned';
        returnedBook.returnDate = new Date();
        const savedreturnedBook = await returnedBook.save();
        const book = returnedBook.book;
        await this.bookService.updateAvailableCopies(book._id.toString(), 1);
        const populatedRecord = await savedreturnedBook.populate('user book');
        return populatedRecord;
    }
    async getBorrowRecordsByStatus(orgId, status) {
        if (status && !['pending', 'borrowed', 'returned'].includes(status))
            throw new common_1.BadRequestException('Invalid status. Allowed values are: pending, borrowed, returned');
        const query = {};
        if (status)
            query.status = status;
        const borrowRecords = await this.borrowBookModel
            .find(query)
            .populate([{ path: 'book' }, { path: 'user', select: 'name email' }]);
        const filtered = borrowRecords.filter((record) => {
            const book = record.book;
            return book && book.organization.toString() === orgId;
        });
        if (!filtered.length) {
            throw new common_1.NotFoundException('No borrow records found for this organization');
        }
        return filtered;
    }
    async getBorrowRecordsByUserId(userId) {
        (0, validate_objectid_utils_1.validateObjectId)(userId);
        const borrowRecords = await this.borrowBookModel
            .find({ user: userId })
            .populate('user book');
        if (borrowRecords.length === 0) {
            throw new common_1.NotFoundException('No borrow records found for this user');
        }
        return borrowRecords;
    }
    async getBorrowRecordById(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const borrowRecord = await this.borrowBookModel
            .findById(id)
            .populate('user book');
        if (!borrowRecord) {
            throw new common_1.NotFoundException('Borrow record not found');
        }
        return borrowRecord;
    }
    async updateBorrowRecordById(id, updateData) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const updatedBorrowRecord = await this.borrowBookModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('user book');
        if (!updatedBorrowRecord) {
            throw new common_1.NotFoundException('Borrow record not found');
        }
        return updatedBorrowRecord;
    }
    async deleteBorrowRecordById(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const deletedBorrowRecord = await this.borrowBookModel
            .findByIdAndDelete(id)
            .populate('user book');
        if (!deletedBorrowRecord) {
            throw new common_1.NotFoundException('Borrow record not found');
        }
        return deletedBorrowRecord;
    }
    async getOverdueBooks() {
        const currentDate = new Date();
        const overdueBooks = await this.borrowBookModel
            .find({
            dueDate: { $lt: currentDate },
            status: 'borrowed',
        })
            .populate('user book');
        if (overdueBooks.length === 0) {
            throw new common_1.NotFoundException('No overdue books found');
        }
        return overdueBooks;
    }
    async getUserOverdueBooks(userId) {
        (0, validate_objectid_utils_1.validateObjectId)(userId);
        const currentDate = new Date();
        const overdueBooks = await this.borrowBookModel
            .find({
            user: userId,
            dueDate: { $lt: currentDate },
            status: 'borrowed',
        })
            .populate('user book');
        if (overdueBooks.length === 0) {
            throw new common_1.NotFoundException('No overdue books found for this user');
        }
        return overdueBooks;
    }
};
exports.BorrowBookService = BorrowBookService;
exports.BorrowBookService = BorrowBookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(borrow_book_schema_1.BorrowBook.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        book_service_1.BookService])
], BorrowBookService);
//# sourceMappingURL=borrow-book.service.js.map