import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";


class Users extends Model{}

Users.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: {
                msg: "Must be a valid Email Address"
            }
        },
        unique: true
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'user'
})

export default Users