const noteDAO = require('./notes.dao');

// add notes
const addNotes = (userId,data) => {
    return noteDAO.addNotes(userId,data);
}

// get notes by user id
const getNotesByUser = (userId,userName) => {
    return noteDAO.getNotesByUser(userId,userName);
}

// get notes by note id
const getNoteByNoteId = (noteId) => {
    return noteDAO.getNoteByNoteId(noteId);
}

//update notes
const updateNotes = (noteId,note) => {
    return noteDAO.updateNotes(noteId,note);
}

//delete notes
const deleteNotes = (noteId) => {
    return noteDAO.deleteNotes(noteId);
}

//search notes by note text
const searchNotesByNoteTitle = (noteTitle) => {
    return noteDAO.searchNotesByNoteTitle(noteTitle);
}

//add notes to favourite
const addNotesToFavourite = (noteId) => {
    return noteDAO.addNotesToFavourite(noteId);
}

//remove notes from favourite
const removeNotesFromFavourite = (noteId) => {
    return noteDAO.removeNotesFromFavourite(noteId);
}

// upload notes
const uploadNotes = () => {
    return noteDAO.uploadNotes();
}

//add notes to group
const addNoteToGroup = (noteId,groupId) => {
    return noteDAO.addNoteToGroup(noteId,groupId);
}

//share notes
const shareNote = (noteId,sharedUsersArray) => {
    return noteDAO.shareNote(noteId,sharedUsersArray);
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