import { Table, Model, Column, DataType } from 'sequelize-typescript';

export interface INewsAttributes {
  title: string;
  description: string;
  content: string;
}

@Table({ tableName: 'news' })
class News extends Model<News, INewsAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  content: string;
}

export default News;
