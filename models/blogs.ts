import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";


class Blog extends Model{}

Blog.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blogTitle:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    blogContent:{
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})

export default Blog