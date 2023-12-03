import { Auth, type IAuthAttributes } from '../models';

type TAuthAttributesWithId = IAuthAttributes & { id: number };

class AuthService {
  public static create = async (data: IAuthAttributes): Promise<any> =>
    Auth.create(data);

  public static update = async ({
    id,
    ...data
  }: TAuthAttributesWithId): Promise<any> =>
    Auth.update(data, {
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
    Auth.update(
      { token },
      {
        where: {
          id,
        },
      },
    );

  public static findById = async (id: number): Promise<any> =>
    Auth.findByPk(id);

  public static findByLogin = async (login: string): Promise<any> =>
    Auth.findOne({ where: { login } });

  public static deleteById = async (id: number): Promise<any> =>
    Auth.destroy({ where: { id } });
}

export default AuthService;
