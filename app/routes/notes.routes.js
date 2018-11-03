
// Defining the routes

module.exports = (app) => {
    const notes = require('../controller/note.controller.js');

    // Creating/Defining new routes

    app.post('/notes',notes.create);

    app.get('/notes',notes.findAll);

    app.get('/notes/:noteId', notes.findOne);

    app.put('/notes/:noteId', notes.update);

    app.delete('/notes/:noteId', notes.delete);
}