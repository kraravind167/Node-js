
const Note = require('../models/note.model.js');

// Create and save a new Note 

exports.create = (req,res) => {
    // Validation

    if(!req.body.content) {
        return res.status(400).send({
            message: "Note Content cannot be empty"
        });
    }

    // Create a Note

    const note = new Note({
        title: req.body.title || "Untitled Note" ,
        content: req.body.content
    });

    // Saving the created notes

    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some Messages"
        });
    });

};

// Retrive and return all notes from database

exports.findAll = (req,res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while retriveing"
        });
    });
};

// Retrive single note by noteId

exports.findOne = (req,res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: req.params.noteId + " is invalid noteId"
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with Id" + req.params.noteId
            });
        }

         return res.status(500).send({
             message: "Error retrieving in " + req.params.noteId
         });
    });
};

// Update the note by noteId

exports.update = (req,res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note Content cannot be empty"
        });
    }

    // Finding note by noteId and updating the content

    Note.findByIdAndUpdate(req.params.noteId, {
        title   : req.body.title || "Untitled" ,
        content : req.body.content
    }, { new:true})
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: req.params.noteId + "is invalid noteId"
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.send(404).send({
                message: "Note not found with Id" + req.params.noteId
            });
        }
        return res.send(500).send({
            message: "Error updating note " + req.params.noteId
        });
    });
};

// Deleting a note by noteId

exports.delete= (req,res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: req.params.noteId + "is invalid noteId"
            });
        } res.send({ message: "Note deleted Successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found with id" + req.params.noteId   
            });
        }
        return res.status(500).send({
            message: "cannot able to delete note with id " + req.params.noteId
        });
    });
};
