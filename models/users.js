
var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: { type: String, required: true },
    lastName: { type: String, },
    userId: { type: String, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    userImage: { type: String }
}, { timestamps: true });

const user = mongoose.model('User', userSchema, 'users');

module.exports = user