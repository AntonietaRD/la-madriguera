require("dotenv").config();

const config = {};

config.db_host = process.env.DB_HOST;
config.db_user = process.env.DB_USER;
config.db_password = process.env.DB_PASSWORD;
config.db_name = process.env.DB_NAME;
config.frontendUrl = process.env.FRONTEND_URL;
config.minPlayers = process.env.MIN_PLAYERS;
config.charset = 'utf8mb4';

module.exports = config;