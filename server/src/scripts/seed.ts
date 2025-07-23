import mongoose from 'mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import {
  Organization,
  OrganizationSchema,
} from '../organization/schemas/organization.shema';
import { Book, BookSchema } from '../book/schemas/book.schema';
import {
  Membership,
  MembershipSchema,
  MembershipRole,
} from '../membership/schemas/membership.schema';
const bcrypt = require('bcrypt');

async function main() {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/bookrack',
  );

  const UserModel = mongoose.model('User', UserSchema);
  const OrganizationModel = mongoose.model('Organization', OrganizationSchema);
  const BookModel = mongoose.model('Book', BookSchema);
  const MembershipModel = mongoose.model('Membership', MembershipSchema);

  // Clear all collections
  await Promise.all([
    UserModel.deleteMany({}),
    OrganizationModel.deleteMany({}),
    BookModel.deleteMany({}),
    MembershipModel.deleteMany({}),
  ]);

  // Create admins
  const adminsData = [
    {
      name: 'Alice Admin',
      email: 'alice@central.com',
      password: 'Password123!',
    },
    { name: 'Bob Admin', email: 'bob@tech.com', password: 'Password123!' },
    { name: 'Carol Admin', email: 'carol@kids.com', password: 'Password123!' },
  ];
  const adminDocs: any[] = [];
  for (const admin of adminsData) {
    const hashed = await bcrypt.hash(admin.password, 10);
    const adminDoc = await UserModel.create({
      name: admin.name,
      email: admin.email,
      password: hashed,
      globalRole: 'admin',
    });
    adminDocs.push(adminDoc);
  }

  // Create organizations and attach admins as owners
  const orgsData = [
    {
      name: 'Central Library',
      description: 'Main city library',
      code: 'CENTRAL',
      owner: adminDocs[0]._id,
    },
    {
      name: 'Tech Library',
      description: 'Technology books',
      code: 'TECH',
      owner: adminDocs[1]._id,
    },
    {
      name: 'Kids Library',
      description: 'Children books',
      code: 'KIDS',
      owner: adminDocs[2]._id,
    },
  ];
  const orgDocs = await OrganizationModel.insertMany(orgsData);

  // Create memberships for admins
  for (let i = 0; i < adminDocs.length; i++) {
    await MembershipModel.create({
      user: adminDocs[i]._id,
      organization: orgDocs[i]._id,
      role: MembershipRole.ADMIN,
      status: 'active',
    });
  }

  // Create members and memberships
  const membersData = [
    { name: 'Dave Member', email: 'dave@central.com', orgIndex: 0 },
    { name: 'Eve Member', email: 'eve@tech.com', orgIndex: 1 },
    { name: 'Frank Member', email: 'frank@kids.com', orgIndex: 2 },
    { name: 'Grace Member', email: 'grace@central.com', orgIndex: 0 },
    { name: 'Heidi Member', email: 'heidi@tech.com', orgIndex: 1 },
  ];
  for (const member of membersData) {
    const hashed = await bcrypt.hash('Password123!', 10);
    const memberDoc = await UserModel.create({
      name: member.name,
      email: member.email,
      password: hashed,
      globalRole: 'user',
    });
    await MembershipModel.create({
      user: memberDoc._id,
      organization: orgDocs[member.orgIndex]._id,
      role: MembershipRole.MEMBER,
      status: 'active',
    });
  }

  // Insert books
  const booksData = [
    // Central Library
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      publishedYear: 1925,
      isbn: '9780743273565',
      organization: orgDocs[0]._id,
      totalCopies: 10,
      availableCopies: 10,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      publishedYear: 1960,
      isbn: '9780061120084',
      organization: orgDocs[0]._id,
      totalCopies: 8,
      availableCopies: 8,
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      publishedYear: 1949,
      isbn: '9780451524935',
      organization: orgDocs[0]._id,
      totalCopies: 12,
      availableCopies: 12,
    },
    {
      title: 'Moby Dick',
      author: 'Herman Melville',
      genre: 'Adventure',
      publishedYear: 1851,
      isbn: '9781503280786',
      organization: orgDocs[0]._id,
      totalCopies: 7,
      availableCopies: 7,
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      publishedYear: 1813,
      isbn: '9781503290563',
      organization: orgDocs[0]._id,
      totalCopies: 9,
      availableCopies: 9,
    },
    // Tech Library
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      genre: 'Programming',
      publishedYear: 2008,
      isbn: '9780132350884',
      organization: orgDocs[1]._id,
      totalCopies: 15,
      availableCopies: 15,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      genre: 'Programming',
      publishedYear: 1999,
      isbn: '9780201616224',
      organization: orgDocs[1]._id,
      totalCopies: 10,
      availableCopies: 10,
    },
    {
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma',
      genre: 'Programming',
      publishedYear: 1994,
      isbn: '9780201633610',
      organization: orgDocs[1]._id,
      totalCopies: 8,
      availableCopies: 8,
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      genre: 'Programming',
      publishedYear: 2009,
      isbn: '9780262033848',
      organization: orgDocs[1]._id,
      totalCopies: 12,
      availableCopies: 12,
    },
    {
      title: 'Refactoring: Improving the Design of Existing Code',
      author: 'Martin Fowler',
      genre: 'Programming',
      publishedYear: 1999,
      isbn: '9780201485677',
      organization: orgDocs[1]._id,
      totalCopies: 9,
      availableCopies: 9,
    },
    // Kids Library
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      publishedYear: 1997,
      isbn: '9780590353427',
      organization: orgDocs[2]._id,
      totalCopies: 20,
      availableCopies: 20,
    },
    {
      title: 'Charlotte’s Web',
      author: 'E.B. White',
      genre: 'Children',
      publishedYear: 1952,
      isbn: '9780064400558',
      organization: orgDocs[2]._id,
      totalCopies: 10,
      availableCopies: 10,
    },
    {
      title: 'Matilda',
      author: 'Roald Dahl',
      genre: 'Children',
      publishedYear: 1988,
      isbn: '9780142410370',
      organization: orgDocs[2]._id,
      totalCopies: 11,
      availableCopies: 11,
    },
    {
      title: 'The Cat in the Hat',
      author: 'Dr. Seuss',
      genre: 'Children',
      publishedYear: 1957,
      isbn: '9780394800011',
      organization: orgDocs[2]._id,
      totalCopies: 13,
      availableCopies: 13,
    },
    {
      title: 'Where the Wild Things Are',
      author: 'Maurice Sendak',
      genre: 'Children',
      publishedYear: 1963,
      isbn: '9780064431781',
      organization: orgDocs[2]._id,
      totalCopies: 14,
      availableCopies: 14,
    },
  ];
  await BookModel.insertMany(booksData);

  console.log('Seed complete!');
  await mongoose.disconnect();
}

main()
  .then(() => {
    // Success message already printed in main
  })
  .catch((err) => {
    console.error('Error during seed:', err);
    process.exit(1);
  });
