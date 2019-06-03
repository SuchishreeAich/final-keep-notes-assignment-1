const router = require('express').Router();
const notesCtrl = require('./notes.controller');
const  auth = require('../auth');

//control access using authentication
router.use(auth.isAuthenticatedUser);

//add notes
router.post('/:userId',(req,res) => { 
   let userId = req.params.userId;
   notesCtrl.addNotes(userId,req.body).then((response) => {
    res.status(response.status).send(response.note);
    }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});


//get notes by user id
router.get('/:userId/:userName',(req,res) => {  
    
    let userId = req.params.userId;
    let userName = req.params.userName;

    notesCtrl.getNotesByUser(userId,userName).then((response) => {
        res.status(response.status).send(response.notes);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//Get note by note id
router.get('/:noteId',(req,res) => {  
    
    let noteId = req.params.noteId;
    notesCtrl.getNoteByNoteId(noteId).then((response) => {
        res.status(response.status).send(response.note);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//Update notes
router.put('/updateNotes/:noteId',(req,res) => {  
    
    let noteId = req.params.noteId;
    notesCtrl.updateNotes(noteId,req.body).then((response) => {
        res.status(response.status).send(response.note);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//Delete Notes
router.delete('/:noteId',(req,res) => {  
    
    let noteId = req.params.noteId;
    notesCtrl.deleteNotes(noteId).then((response) => {
        res.status(response.status).send(response.note);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//upload notes
router.post('/',(req,res) => {  
    
    notesCtrl.uploadNotes().then((response) => {
        res.status(response.status).send(response);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//Search Notes by Title
router.get('/searchNotesByTitle/:title',(req,res) => {  
  
    let noteTitle = req.params.title;
    notesCtrl.searchNotesByNoteTitle(noteTitle).then((response) => {
        res.status(response.status).send(response.notes);
     }).catch((error) => {
        res.status(error.status).send(error);
    }); 
});

//Add/Remove notes to Favourite 
router.put('/:noteId',(req,res) => {  
    
    let noteId = req.params.noteId;
    let isFavourite = req.query.isFavourite;

    if(isFavourite === true || isFavourite === 'true'){
        notesCtrl.addNotesToFavourite(noteId).then((response) => {
            res.status(response.status).send(response.note);
         }).catch((error) => {
            res.status(error.status).send(error);
        });
    } 
    else{
        notesCtrl.removeNotesFromFavourite(noteId).then((response) => {
            res.status(response.status).send(response.note);
         }).catch((error) => {
            res.status(error.status).send(error);
        });
    }    
});


//Add notes to Group
router.put('/addNoteToGroup/:noteId/:groupId',(req,res) => { 
    
    let groupId = req.params.groupId;
    let noteId = req.params.noteId;

    notesCtrl.addNoteToGroup(noteId,groupId).then((response) => {
     res.status(response.status).send(response.note);
     }).catch((error) => {
         res.status(error.status).send(error);
     }); 
 });

//Share Notes
router.put('/shareNote/:noteId',(req,res) => { 
    
    let noteId = req.params.noteId;
    let sharedUsersArray = req.body.sharedUsers;
    notesCtrl.shareNote(noteId,sharedUsersArray).then((response) => {
     res.status(response.status).send(response.note);
     }).catch((error) => {
         res.status(error.status).send(error);
     }); 
 });

module.exports = router;