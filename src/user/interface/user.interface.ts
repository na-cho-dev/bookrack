export interface UserInterface {
  _id?: string;
  email: string;
  name?: string;
  password?: string;
  role: string;
}

export interface UserResponseInterface
  extends Omit<UserInterface, 'password'> {}
