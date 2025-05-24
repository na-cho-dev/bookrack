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
    async createBorrowRecord(borrowBook) {
        (0, validate_objectid_utils_1.validateObjectId)(borrowBook.user);
        (0, validate_objectid_utils_1.validateObjectId)(borrowBook.book);
        const existingRecord = await this.borrowBookModel.findOne({
            user: borrowBook.user,
            book: borrowBook.book,
            status: 'borrowed',
        });
        if (existingRecord) {
            throw new common_1.BadRequestException('Borrow record already exists for this user and book');
        }
        if (borrowBook.dueDate < borrowBook.borrowDate) {
            throw new common_1.BadRequestException('Due date cannot be earlier than borrow date');
        }
        const newBorrowRecord = new this.borrowBookModel(borrowBook);
        const savedBorrowedRecord = await newBorrowRecord.save();
        await this.bookService.updateAvailableCopies(borrowBook.book, -1);
        const populatedRecord = await savedBorrowedRecord.populate('user book');
        return populatedRecord;
    }
    async returnBook(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const borrowRecord = await this.borrowBookModel
            .findById(id)
            .populate('book');
        if (!borrowRecord || borrowRecord.status === 'returned') {
            throw new common_1.BadRequestException('Book is already returned or not found');
        }
        borrowRecord.status = 'pending-return';
        const savedBorrowRecord = await borrowRecord.save();
        const populatedRecord = await savedBorrowRecord.populate('user book');
        return populatedRecord;
    }
    async approveBookReturn(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const returnedBook = await this.borrowBookModel
            .findById(id)
            .populate('book');
        if (!returnedBook || returnedBook.status === 'returned') {
            throw new common_1.BadRequestException('Book is already returned or not found');
        }
        returnedBook.status = 'returned';
        returnedBook.returnDate = new Date();
        const savedreturnedBook = await returnedBook.save();
        const book = returnedBook.book;
        await this.bookService.updateAvailableCopies(book._id.toString(), 1);
        const populatedRecord = await savedreturnedBook.populate('user book');
        return populatedRecord;
    }
    async getAllBorrowRecords() {
        const borrowRecords = await this.borrowBookModel
            .find()
            .populate('user book');
        if (!borrowRecords || borrowRecords.length === 0) {
            throw new common_1.NotFoundException('No borrow records found');
        }
        return borrowRecords;
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
    async getBorrowRecordsByBookId(bookId) {
        (0, validate_objectid_utils_1.validateObjectId)(bookId);
        const borrowRecords = await this.borrowBookModel
            .find({ book: bookId })
            .populate('user book');
        if (borrowRecords.length === 0) {
            throw new common_1.NotFoundException('No borrow records found for this book');
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