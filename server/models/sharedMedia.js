const mongoose = require('mongoose');

const sharedMediaSchema = new mongoose.Schema({
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sharedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sharedAt: Date
})

const SharedMedia = mongoose.model('SharedMedia', sharedMediaSchema)

module.exports = SharedMedia