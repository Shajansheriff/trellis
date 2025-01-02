import { UsersRepository } from '@/db/repositories/users';

export class LoginService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.getByEmail(email);
    if (!user) {
      return {
        status: 'error',
        message: 'User not found',
      };
    }

    return {
      status: 'success',
      message: 'Login successful',
      data: {
        token: '1234567890', // JWT token
      },
    };
  }
}
