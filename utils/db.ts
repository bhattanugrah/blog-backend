import { Sequelize } from "sequelize";
import { HOST, DB_NAME, PORT, PASSWORD, USER } from "./config";
import {Umzug, SequelizeStorage} from 'umzug'


export const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
    host: HOST,
    dialect: "mysql"
})

const runMigrations = async() => {
    const migrator = new Umzug({
        migrations: {
            glob:  'migrations/*ts'
        },
        storage: new SequelizeStorage({sequelize, tableName: 'migrations'}),
        context: sequelize.getQueryInterface(),
        logger: console,
    })
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}



export const connectToDatabase = async() => {
    try{
        await sequelize.authenticate()
        await runMigrations()
        console.log('Connected To Database Succesfull!')
    }catch(error){
        console.log('Failed to connect to Database!', error)
        return process.exit(1)
    }
}