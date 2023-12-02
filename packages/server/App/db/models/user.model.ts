import { Table, Model, Column, DataType } from 'sequelize-typescript';

export interface IUserAttributes {
  login: string;
  password: string;
  token: string;
}

@Table({ tableName: 'user' })
class User extends Model<User, IUserAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  token: string;
}

export default User;
