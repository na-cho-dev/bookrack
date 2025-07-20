import { forwardRef, Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Membership, MembershipSchema } from './schemas/membership.schema';
import { UserModule } from 'src/user/user.module';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Membership.name, schema: MembershipSchema },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => OrganizationModule),
  ],
  providers: [MembershipService],
  controllers: [MembershipController],
  exports: [MembershipService],
})
export class MembershipModule {}
