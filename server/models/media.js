const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    url: String,
    type: String,
    timestamp: Date
})

const Media = mongoose.model('Media', mediaSchema)

module.exports = Media;
