import { News, type INewsAttributes } from '../models';

type TNewsAttributesWithId = INewsAttributes & { id: number };

class NewsService {
  public static create = async (data: INewsAttributes): Promise<any> =>
    News.create(data);

  public static update = async ({
    id,
    ...data
  }: TNewsAttributesWithId): Promise<any> =>
    News.update(data, {
      where: {
        id,
      },
    });

  public static getAll = async (): Promise<TNewsAttributesWithId[]> =>
    News.findAll();

  public static findById = async (id: number): Promise<any> =>
    News.findByPk(id);

  public static deleteById = async (id: number): Promise<any> =>
    News.destroy({ where: { id } });
}

export default NewsService;
