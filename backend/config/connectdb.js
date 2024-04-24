const { default: mongoose } = require("mongoose");
require("dotenv").config();

// eslint-disable-next-line no-undef
const connection = mongoose.connect(process.env.DB_URL);

module.exports = { connection };
