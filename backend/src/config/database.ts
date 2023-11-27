import { Dialect, Sequelize } from "sequelize";
require("dotenv").config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT as string;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: +dbPort || 3307,
  dialect: dbDriver || "mysql",
  logging: false,
});

export default sequelizeConnection;
