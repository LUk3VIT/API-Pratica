import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface ProdutoAttributes {
    id?: number;
    name: string;
    tipo: string;
}

export class Produto extends Model<ProdutoAttributes> implements ProdutoAttributes{
    public id!: number;
    public name!: string;
    public tipo!: string;
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
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos' 
}
);