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
  @MembershipRoles(MembershipRole.ADMIN)
  async getBorrowRecordsByStatus(
    @Headers('x-organization-id') orgId: string,
    @Query('status') status?: string,
  ) {
    const statuses = status ? status.split(',') : undefined;
    const borrowRecords = await this.borrowBookService.getBorrowRecordsByStatus(
      orgId,
      statuses,
    );

    return {
      message: 'Borrow records retrieved successfully',
      data: borrowRecords,
    };
  }

  @Get(':id')
  async getBorrowRecordsById(@Param('id') id: string) {
    const borrowRecord = await this.borrowBookService.getBorrowRecordById(id);
    return {
      message: 'Borrow record retrieved successfully',
      data: borrowRecord,
    };
  }

  @Get('user/:userId/status')
  async getUserBorrowRecordsByStatus(
    @Param('userId') userId: string,
    @Headers('x-organization-id') orgId: string,
    @Query('status') status?: string,
  ) {
    const statuses = status ? status.split(',') : undefined;
    const borrowRecords =
      await this.borrowBookService.getUserBorrowRecordsByStatus(
        userId,
        orgId,
        statuses,
      );
    return {
      message: 'Borrow records retrieved successfully',
      data: borrowRecords,
    };
  }

  @Get('user/:userId/overdue')
  async getUserOverdueBooks(@Param('userId') userId: string) {
    const overdueBooks =
      await this.borrowBookService.getUserOverdueBooks(userId);
    return {
      message: 'User overdue books retrieved successfully',
      data: overdueBooks,
    };
  }

  @Get('overdue')
  @MembershipRoles(MembershipRole.ADMIN)
  async getOverdueBooks() {
    const overdueBooks = await this.borrowBookService.getOverdueBooks();
    return {
      message: 'Overdue books retrieved successfully',
      data: overdueBooks,
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
      data: updatedBorrowRecord,
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
      data: borrowedBookRequest,
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
      data: returnedBook,
    };
  }

  @Patch('return/:id/approve')
  @MembershipRoles(MembershipRole.ADMIN)
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
      data: returnedBook,
    };
  }

  @Patch(':id/cancel')
  async cancelBorrowRequest(
    @Param('id') id: string,
    @Headers('x-organization-id') orgId: string,
  ) {
    const canceledRecord = await this.borrowBookService.cancelBorrowRequest(
      id,
      orgId,
    );

    return {
      message: 'Borrow request canceled successfully',
      data: canceledRecord,
    };
  }

  @Delete(':id')
  async deleteBorrowRecordById(@Param('id') id: string) {
    const deletedBorrowRecord =
      await this.borrowBookService.deleteBorrowRecordById(id);
    return {
      message: 'Borrow record deleted successfully',
      data: deletedBorrowRecord,
    };
  }
}
