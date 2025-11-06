import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface ProdutoAttributes {
  id?: number;
  name: string;
  preco: number;
}

export class Produto extends Model<ProdutoAttributes> implements ProdutoAttributes {
  public id!: number;
  public name!: string;
  public preco!: number;
}

Produto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Produto",
    tableName: "produtos",
  }
);