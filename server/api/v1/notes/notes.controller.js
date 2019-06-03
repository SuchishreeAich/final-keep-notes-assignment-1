const notesService = require('./notes.service');

//add notes
const addNotes = (userId,data) => {
    return notesService.addNotes(userId,data);
}

//get notes by user id
const getNotesByUser = (userId,userName) => {
    return notesService.getNotesByUser(userId,userName);
}

//get notes by note id
const getNoteByNoteId = (noteId) => {
    return notesService.getNoteByNoteId(noteId);
}

//update notes
const updateNotes = (noteId,note) => {
    return notesService.updateNotes(noteId,note);
}

//delete notes
const deleteNotes = (noteId) => {
    return notesService.deleteNotes(noteId);
}

//search notes by note text
const searchNotesByNoteTitle = (noteTitle) => {
    return notesService.searchNotesByNoteTitle(noteTitle);
}

//add notes to favourite
const addNotesToFavourite = (noteId) => {
    return notesService.addNotesToFavourite(noteId);
}

//remove notes from favourite
const removeNotesFromFavourite = (noteId) => {
    return notesService.removeNotesFromFavourite(noteId);
}

//upload notes
const uploadNotes = () => {
    return notesService.uploadNotes();
}

//add notes to group
const addNoteToGroup = (noteId,groupId) => {
    return notesService.addNoteToGroup(noteId,groupId);
}

//share notes
const shareNote = (noteId,sharedUsersArray) => {
    return notesService.shareNote(noteId,sharedUsersArray);
}

module.exports = {
    addNotes,
    getNotesByUser,
    getNoteByNoteId,
    updateNotes,
    deleteNotes,
    searchNotesByNoteTitle,
    addNotesToFavourite,
    removeNotesFromFavourite,
    uploadNotes,
    addNoteToGroup,
    shareNote
}