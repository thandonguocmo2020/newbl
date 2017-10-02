var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

module.exports = mongoose.model('subscribe', new mongoose.Schema({

    mail: String,
    // last action
    act: {
        type: Date,
        default: Date.now()
    },

    crt: {
        type: Date,
        default: Date.now()
    }

}, { collection: 'subscribes' }).plugin(mongoosePaginate));



