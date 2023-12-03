import { Table, Model, Column, DataType } from 'sequelize-typescript';

export interface IAuthAttributes {
  login: string;
  password: string;
  token: string;
}

@Table({ tableName: 'auth' })
class Auth extends Model<Auth, IAuthAttributes> {
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

export default Auth;
