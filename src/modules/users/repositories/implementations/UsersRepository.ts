import { getRepository, Repository, IsNull } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this
      .repository
      .findOne({
        relations: ["games"],
        where: {
          id: user_id
        }
      });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this
      .repository
      .query("SELECT * FROM users ORDER BY first_name ASC");

    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this
      .repository
      .query(
        "SELECT * FROM users WHERE first_name ILIKE $1 AND last_name ILIKE $2",
        [
          `%${first_name}%`,
          `%${last_name}%`
        ]);

    return users;
  }
}
