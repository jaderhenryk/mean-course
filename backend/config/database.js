const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://127.0.0.1:27017/db_finance', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })