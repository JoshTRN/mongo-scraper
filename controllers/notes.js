const Note = require('../models/Note.js');
const makeDate = require('../scripts/date.js');

module.exports = {
    get: (data, cb) => {
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    save: (data, cb) => {
        const newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
        Note.create(newNote, function(err, doc) {
            if (err) throw err;
            else {
                console.log(doc)
                cb(doc)
            }
        }) 
    },
    delete: (data, cb) => {
        Note.remove({
            _id: data._id
        }, cb);
    }
}