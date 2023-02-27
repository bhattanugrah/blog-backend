import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'user_id');
    await queryInterface.createTable('blogs', {
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
        },
        created_at:{
            type: DataTypes.DATE
          },
        updated_at:{
            type: DataTypes.DATE
        }
    })
    await queryInterface.createTable('users', {
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
        email_id: {
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
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at:{
            type: DataTypes.DATE
          },
        updated_at:{
            type: DataTypes.DATE
        }
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('notes')
    await queryInterface.dropTable('users')
  },
}