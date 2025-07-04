import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BorrowBookService } from './borrow-book.service';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { MembershipRoleGuard } from 'src/guards/membership-role.guard';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserResponse } from 'src/user/interface/user.interface';
import { MembershipGuard } from 'src/guards/membership.guard';
import { MembershipRoles } from 'src/decorators/membership-role.decorator';
import { MembershipRole } from 'src/membership/schemas/membership.schema';

@ApiTags('Borrow Books')
@ApiCookieAuth('Authentication')
@Controller('borrow-books')
@UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
export class BorrowBookController {
  constructor(private readonly borrowBookService: BorrowBookService) {}

  @Post('create')
  async createBorrowRecord(
    @Body() borrowBookDto: CreateBorrowBookDto,
    @CurrentUser() user: UserResponse,
    @Headers('x-organization-id') orgId: string,
  ) {
    const borrowRecord = await this.borrowBookService.createBorrowRecord(
      borrowBookDto,
      user._id,
      orgId,
    );

    return {
      message: 'Borrow record created successfully',
      data: borrowRecord,
    };
  }

  @Get()
  async getBorrowRecordsByStatus(
    @Headers('x-organization-id') orgId: string,
    @Query('status') status?: string,
  ) {
    const borrowRecords = await this.borrowBookService.getBorrowRecordsByStatus(
      orgId,
      status,
    );

    return {
      message: 'Borrow records retrieved successfully',
      borrowRecords,
    };
  }

  @Patch(':id/approve')
  @MembershipRoles(MembershipRole.ADMIN)
  async approveBorrowRequest(
    @Param('id') id: string,
    @Body() updateData: UpdateBorrowBookDto,
    @Headers('x-organization-id') orgId: string,
  ) {
    const borrowedBookRequest =
      await this.borrowBookService.approveBorrowRequest(id, updateData, orgId);

    return {
      message: 'Borrow request has been approved successfully',
      borrowedBookRequest,
    };
  }

  @Patch('return/:id')
  async returnBook(
    @Param('id') id: string,
    @Headers('x-organization-id') orgId: string,
  ) {
    const returnedBook = await this.borrowBookService.returnBook(id, orgId);

    return {
      message: 'Book returned successfully',
      returnedBook,
    };
  }

  @Patch('return/:id/approve')
  async approveBookReturn(
    @Param('id') id: string,
    @Headers('x-organization-id') orgId: string,
  ) {
    const returnedBook = await this.borrowBookService.approveBookReturn(
      id,
      orgId,
    );

    return {
      message: 'Book return has been approved successfully',
      returnedBook,
    };
  }

  @Get('user/:userId')
  async getBorrowRecordsByUserId(@Param('userId') userId: string) {
    const borrowRecords =
      await this.borrowBookService.getBorrowRecordsByUserId(userId);
    return {
      message: 'Borrow records retrieved successfully',
      borrowRecords,
    };
  }

  @Get('user/:userId/overdue')
  async getUserOverdueBooks(@Param('userId') userId: string) {
    const overdueBooks =
      await this.borrowBookService.getUserOverdueBooks(userId);
    return {
      message: 'User overdue books retrieved successfully',
      overdueBooks,
    };
  }

  @Get('overdue')
  async getOverdueBooks() {
    const overdueBooks = await this.borrowBookService.getOverdueBooks();
    return {
      message: 'Overdue books retrieved successfully',
      overdueBooks,
    };
  }

  @Get(':id')
  async getBorrowRecordsById(@Param('id') id: string) {
    const borrowRecord = await this.borrowBookService.getBorrowRecordById(id);
    return {
      message: 'Borrow record retrieved successfully',
      borrowRecord,
    };
  }

  @Put(':id')
  async updateBorrowRecordById(
    @Param('id') id: string,
    @Body() updateData: UpdateBorrowBookDto,
  ) {
    const updatedBorrowRecord =
      await this.borrowBookService.updateBorrowRecordById(id, updateData);
    return {
      message: 'Borrow record updated successfully',
      updatedBorrowRecord,
    };
  }

  @Delete(':id')
  async deleteBorrowRecordById(@Param('id') id: string) {
    const deletedBorrowRecord =
      await this.borrowBookService.deleteBorrowRecordById(id);
    return {
      message: 'Borrow record deleted successfully',
      deletedBorrowRecord,
    };
  }
}
