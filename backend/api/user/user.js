const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.scheme({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 12 }
})

module.exports = restful.model('User', userSchema)
