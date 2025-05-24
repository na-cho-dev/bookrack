import { Test, TestingModule } from '@nestjs/testing';
import { BorrowBookController } from './borrow-book.controller';

describe('BorrowBookController', () => {
  let controller: BorrowBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowBookController],
    }).compile();

    controller = module.get<BorrowBookController>(BorrowBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
