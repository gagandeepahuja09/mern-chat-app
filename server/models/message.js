const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
        required: true,
    }
});

module.exports = mongoose.model('Message', messageSchema);