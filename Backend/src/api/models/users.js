const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true, minLength: 2, maxLength: 20 }, // probar usar minLength: 2, maxLength: 20
    email: { type: String, required: true, trim: true, unique: true, match: ['/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/'] },
    password: { type: String, required: true, trim: true, minLength: 8 }, // probar usar minLength: 8
    rol: { type: String, enum: ['admin', 'user'], default: 'user' },
    avatar: { type: String, default: 'https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png' },
    favorite: [{ type: mongoose.Types.ObjectId, ref: 'padelMatches' }],
}, {
    timestamps: true,
    collection: 'users'
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = User