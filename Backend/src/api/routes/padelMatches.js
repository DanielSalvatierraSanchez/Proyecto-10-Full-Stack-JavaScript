const mongoose = require('mongoose')

const padelMatchSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    hour: { type: String, required: true, trim: true },
    place: { type: String, required: true, enum: ['indoor', 'outdoor'] },
    author: { type: String, required: true, trim: true },
}, {
    timestamps: true,
    collection: 'padelMatches'
})

const PadelMatch = mongoose.model('padelMatches', padelMatchSchema, 'padelMatches')

module.exports = PadelMatch