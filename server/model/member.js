var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

module.exports = mongoose.model('member', new mongoose.Schema({
    uid: String,
    pwd: String,
    mail: String,
    img: String,
    fn: String,
    stt: Number,
    // last action
    act: {
        type: Date,
        default: Date.now()
    },
    crt: {
        type: Date,
        default: Date.now()
    }

}, { collection: 'members' }).plugin(mongoosePaginate));



