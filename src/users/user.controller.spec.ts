import mongoose from 'mongoose';
import { UsersController } from './user.controller';
import { UserSchema } from './user.schema';
import { UsersService } from './user.service';

const UserModel = mongoose.model('User', UserSchema);

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    // eslint-disable-next-line
    // @ts-ignore
    usersService = new UsersService(UserModel);
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        new UserModel({
          _id: '123',
          name: 'Rafael',
          email: 'rafael@gmail.com',
          role: 'ADMIN',
          password: '123',
        }),
      ];
      // eslint-disable-next-line
      // @ts-ignore
      jest.spyOn(usersService, 'findAll').mockResolvedValue(result);

      expect(await usersController.list()).toBe(result);
    });

    it('should create a user and return it on list', async () => {
      const user = {
        name: 'Rafael',
        email: 'rafael-test@gmail.com',
        role: 'ADMIN' as 'ADMIN' | 'CLIENT',
        password: '123',
      };

      const createdUser = await usersController.create(user);

      const users = await usersController.list();

      const existingUser = users.find((u) => (u.email = user.email));

      expect(existingUser).toBeTruthy();
      expect(existingUser._id).toBe(createdUser._id);
    }, 30000);
  });
});
