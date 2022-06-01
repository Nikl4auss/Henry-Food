require('dotenv').config()

const {DB_USER, DB_PASSWORD, DB_HOST, API_KEY} = process.env

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_KEY
}