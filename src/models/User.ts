import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface UserAttributes {
    id?: number;
    userName: string;
    email: string;
    password: string;
    numeroTelefone: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public userName!: string;
    public email!: string;
    public password!: string;
    public numeroTelefone!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroTelefone: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});