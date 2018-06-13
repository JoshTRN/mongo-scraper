const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({

    _headlineId: {
        type: String,
        required: true,
        ref: "Article"
    },

    date: String,
    noteText: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note
