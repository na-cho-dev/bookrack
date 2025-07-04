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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const book_schema_1 = require("./schemas/book.schema");
const mongoose_2 = require("mongoose");
const validate_objectid_utils_1 = require("../common/utils/validate-objectid.utils");
let BookService = class BookService {
    bookModel;
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async getBookQuery(query) {
        return this.bookModel.find(query ?? {});
    }
    async addBook(bookData, orgId) {
        const existingBook = await this.bookModel.findOne({
            isbn: bookData.isbn,
            organization: orgId,
        });
        if (existingBook) {
            throw new common_1.BadRequestException('Book with this ISBN already exists');
        }
        const book = new this.bookModel({ ...bookData, organization: orgId });
        return book.save();
    }
    async getAllBooksByOrg(orgId) {
        const books = await this.bookModel
            .find({ organization: orgId })
            .populate('organization');
        if (!books || books.length === 0) {
            throw new common_1.NotFoundException('No books found');
        }
        return books;
    }
    async getAvailableBooksByOrg(orgId) {
        const books = await this.bookModel
            .find({ organization: orgId, availableCopies: { $gt: 0 } })
            .populate('organization');
        if (!books || books.length === 0)
            throw new common_1.NotFoundException('No available books found');
        return books;
    }
    async getBookById(id, orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const book = await this.bookModel
            .findOne({ _id: id, organization: orgId })
            .populate('organization');
        if (!book) {
            throw new common_1.BadRequestException('Book not found in this organization');
        }
        return book;
    }
    async updateBookById(id, updateData) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedBook) {
            throw new common_1.BadRequestException('Book not found');
        }
        return updatedBook;
    }
    async deleteBookById(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const deletedBook = await this.bookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            throw new common_1.NotFoundException('Book not found');
        }
        return deletedBook;
    }
    async updateAvailableCopies(id, count) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new common_1.BadRequestException('Book not found');
        }
        const newAvailableCopies = book.availableCopies + count;
        if (newAvailableCopies < 0) {
            throw new common_1.BadRequestException('Not enough copies available');
        }
        book.availableCopies = newAvailableCopies;
        await book.save();
        return book;
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookService);
//# sourceMappingURL=book.service.js.map