const noteModule = require('./notes.entity');
const uuidv1 = require('uuid/v1');
const dbConfigVal = require('../../../config').appConfig.dbConfig;
const streamToMongoDB = require('stream-to-mongo-db');
const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');
const JSONStream = require('JSONStream');
const notesFile = path.resolve(__dirname, '../../../../', 'mock_notes.json');

const addNotes = (userId,data) => {
    return new Promise((resolve,reject) => {
        let newNote = new noteModule();
        
        newNote.id = uuidv1();
        newNote.title = data.title;
        newNote.text = data.text;
        newNote.userId = userId;
        if(data.state!==''){
            newNote.state = data.state;
        }

        newNote.save((error,addedNote) => {
            if(error){
                reject({message : 'Internal server error',status : 500});
            }
            else{
                resolve({message : "Successfull add note",status:201,note:addedNote});
            }
        });
    });
};

const getNotesByUser = (userId,userName) => {

    return new Promise((resolve,reject) => {       

        noteModule.find(
            {$or: [{'userId' : userId},{'sharedUsers' : userName}]}, 
            function(err,data){
            if(err){
                reject({message : 'Internal server error',status : 500});
            }
            else if(!data){
                reject({message : 'No notes found for this userId',status : 200});
            }
            else{
                resolve({message : "Successfull note fetch",status:200,notes:data}); 
            }
        });
        
    });
};

const getNoteByNoteId = (noteId) => {

    return new Promise((resolve,reject) => {
        
        noteModule.find({'id' :  noteId}, function(err,data){
            
            if(err){
                reject({message : 'Internal server error',status : 500});
            }
            else if(!data){
                reject({message : 'No notes found for this noteId',status : 200});
            }
            else{
                resolve({message : "Successfull note fetch",status:200,note:data}); 
            }
        });
        
    });
};


const updateNotes = (noteId,note) => {
   
    return new Promise((resolve,reject) => {

        let updatedNote = {
            $set:{
                title: note.title,
                text: note.text,
                state: note.state
            }
        };

        noteModule.findOneAndUpdate({'id' : noteId},updatedNote,{new: true},(err,note) =>{

            if(err){
                reject({message : 'Internal server error while updating notes',status : 500});
            }
            else if(!note){
                reject({message : 'No note found for this noteId',status : 500});
            }
            else{
                let noteUpdate = {id : note.id,title : note.title, text : note.text};
                resolve({message : 'Update note successfull',status : 200,note:noteUpdate});
            }
        });
    });
};


const deleteNotes = (noteId) => {
   
    return new Promise((resolve,reject) => {

        noteModule.findOneAndDelete({'id' : noteId},(err,note) =>{
            if(err){
                reject({message : 'Internal server error while deleting notes',status : 500});
            }
            else if(!note){
                reject({message : 'No note found for this noteId',status : 500});
            }
            else{
                let deletedNote = {id : note.id,title : note.title, text : note.text};
                resolve({message : 'Delete note successfull',status : 200,note:deletedNote});
            }
        });         
    });
};

const searchNotesByNoteTitle = (noteTitle) => {
     

    return new Promise((resolve,reject) => {

        let titleSearch = `'`+noteTitle+`'`;

        let searchCriteria = {
            title: { $regex: noteTitle, $options: 'i' }, //regex search
            // userId: userid
        }

        noteModule.find(searchCriteria,(error,data)=> {

            if(error){
                reject({message : 'Internal server error',status : 500});
            }
            else if(!data){
                reject({message : 'No notes found for this title',status : 200});
            }
            else{
                resolve({message : "Successfull note fetch",status:200,notes:data}); 
            }
        });       
    });
};

const addNotesToFavourite = (noteId) => {
    return new Promise((resolve,reject) => {

        let updatedNote = {
            $set:{
                isFavourite: true
            }
        };

        noteModule.findOneAndUpdate({'id' : noteId},updatedNote,{new: true},(err,note) =>{

            if(err){
                reject({message : 'Internal server error while marking notes as favourite',status : 500});
            }
            else if(!note){
                reject({message : 'No note found for this noteId',status : 500});
            }
            else{
                let noteUpdate = {id : note.id,title : note.title, text : note.text , 
                    isFavourite: note.isFavourite};
                resolve({message : 'Marked note as favourite successfully',status : 200,note:noteUpdate});
            }
        });
    });
};

const removeNotesFromFavourite = (noteId) => {
    return new Promise((resolve,reject) => {

        let updatedNote = {
            $set:{
                isFavourite: false
            }
        };

        noteModule.findOneAndUpdate({'id' : noteId},updatedNote,{new: true},(err,note) =>{

            if(err){
                reject({message : 'Internal server error while removing notes as favourite',status : 500});
            }
            else if(!note){
                reject({message : 'No note found for this noteId',status : 500});
            }
            else{
                let noteUpdate = {id : note.id,title : note.title, text : note.text , 
                    isFavourite: note.isFavourite};
                resolve({message : 'Removed note as favourite successfully',status : 200,note:noteUpdate});
            }
        });
    });
};

const notesTransform = new Transform({
    readableObjectMode : true,
    writableObjectMode : true,
    transform(note,encoding,done){

        let noteUpload = new noteModule();
        noteUpload.id = uuidv1();
        noteUpload.title = note.title;
        noteUpload.text = note.text;
        noteUpload.userId = note.userId;

        this.push(noteUpload);
        done();       
    }
});

const uploadNotes = () => {

    return new Promise((resolve,reject) => {

        const uploadDB = {dbURL : dbConfigVal.mongoUrl,collection : "notes"};

        const notesWriteStream = streamToMongoDB.streamToMongoDB(uploadDB);

        const notesReadStream = fs.createReadStream(notesFile,'utf8').pipe(JSONStream.parse('*'));

        const notesUploadStream = notesReadStream.pipe(notesTransform).pipe(notesWriteStream);

        notesUploadStream.on('finish' , () =>resolve({message : 'Notes uploaded', status : 201}))
        .on('error', (error) => reject({message : error.message , status : 500}));

    }); 
};


const addNoteToGroup = (noteId,groupId) => {
    return new Promise((resolve,reject) => {

        let updatedNoteGroupArray = [];

        updatedNoteGroupArray.push(groupId);

        let updatedNote = {
            $set:{
                group : groupId
            }
        };

        noteModule.findOneAndUpdate({'id' : noteId},updatedNote,{new: true,multi:true},(err,note) =>{
            if(err){
                reject({message : 'Internal server error while updating notes',status : 500});
            }
            else if(!note){
                reject({message : 'No note found for this noteId',status : 500});
            }
            else{
                let noteUpdate = {id : note.id,group: note.group};
                resolve({message : 'Update note successfull',status : 200,note:noteUpdate});
            }
        });
    });
};

const shareNote = (noteId,shareUserArray) => {

    return new Promise((resolve,reject) => {

        let updatedNote = {
            $push:{
                sharedUsers : shareUserArray
            }
        };

        noteModule.findOneAndUpdate({'id' : noteId},updatedNote,{new: true,multi : true},(err,note) =>{

            if(err){
                reject({message : 'Internal server error while sharing notes',status : 500});
            }
            else if(!note){
                reject({message : 'No note found for this noteId',status : 500});
            }
            else{
                let noteUpdate = {id : note.id,sharedUsers: note.sharedUsers};
                resolve({message : 'Share note successfull',status : 200,note:noteUpdate});
            }
        });
    });
};


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