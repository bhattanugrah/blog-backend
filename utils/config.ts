import dotenv from 'dotenv'

dotenv.config()

const HOST = process.env.DB_HOST as string
const PORT = process.env.DB_PORT as string
const USER = process.env.DB_USER as string
const PASSWORD = process.env.DB_PASSWORD as string
const DB_NAME = process.env.DB_NAME as string
const SECRET = process.env.SECRET as string

export {
    HOST,
    PORT,
    USER,
    PASSWORD,
    DB_NAME,
    SECRET
}