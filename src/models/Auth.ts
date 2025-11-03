import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface AuthAttributes {
    id?: number;
    email: string;
    password: string;
    name: string;
}

export class Auth extends Model<AuthAttributes> implements AuthAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public name!: string;
}

Auth.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Auth',
    tableName: 'auths'
});