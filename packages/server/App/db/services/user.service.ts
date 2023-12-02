import { User, type IUserAttributes } from '../models';

type TUserAttributesWithId = IUserAttributes & { id: number };

class UserService {
  public static create = async (data: IUserAttributes): Promise<any> =>
    User.create(data);

  public static update = async ({
    id,
    ...data
  }: TUserAttributesWithId): Promise<any> =>
    User.update(data, {
      where: {
        id,
      },
    });

  public static updateToken = async ({
    id,
    token,
  }: {
    id: number;
    token: string;
  }): Promise<any> =>
    User.update(
      { token },
      {
        where: {
          id,
        },
      },
    );

  public static findById = async (id: number): Promise<any> =>
    User.findByPk(id);

  public static findByLogin = async (login: string): Promise<any> =>
    User.findOne({ where: { login } });

  public static deleteById = async (id: number): Promise<any> =>
    User.destroy({ where: { id } });
}

export default UserService;
