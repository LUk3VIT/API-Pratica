import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface ProdutoAttributes {
    id?: number;
    name: string;
    valor: number;
}

export class Produto extends Model<ProdutoAttributes> implements ProdutoAttributes{
    public id!: number;
    public name!: string;
    public valor!: number;
}

Produto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos' 
}
);