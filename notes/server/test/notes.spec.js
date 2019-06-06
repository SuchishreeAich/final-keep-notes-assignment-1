const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const expect = require('chai').expect;

const USER_ID_1 = config.USER_ID_1; // userID should be same which is used to generate the token 
const USER_ID_2 = config.USER_ID_2; // userID should be same which is used to generate the token
const USER_ID_3 = config.USER_ID_3;

const USER_NAME_1 = config.USER_NAME_1;
const USER_NAME_2 = config.USER_NAME_2;
const USER_NAME_3 = config.USER_NAME_3;

let NOTE_ID = '';
let NOTE_ID_1 = config.NOTE_1.NOTE_ID;
let token = config.token_USER_1;
//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
    // Should get added note of user 1 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    // Pass valid token in Authorization header as Bearer
    request(app)
    .post(`/api/v1/notes/${USER_ID_1}`)
    .send(config.NOTE_1)
    .set('Authorization' , 'Bearer '+ token)
    .expect(201)
    .then((response) => {
      NOTE_ID = response.body.id;

      expect(response.body.title).to.equal(config.NOTE_1.title);
      expect(response.body.text).to.equal(config.NOTE_1.text);
      done();
    });
  });

  //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    // Should get added note of user 2 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    // Pass valid token in Authorization header as Bearer
    request(app)
    .post(`/api/v1/notes/${USER_ID_2}`)
    .send(config.NOTE_2)
    .set('Authorization' , 'Bearer '+token)
    .expect(201)
    .then((response) => {

      expect(response.body.title).to.equal(config.NOTE_2.title);
      expect(response.body.text).to.equal(config.NOTE_2.text);
      done();
    });
  });
});

//  testsuite
describe('Testing to get all notes', function()
{
  //  testcase
  it('Should handle a request to get all notes of a user 1', function(done)
  {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 1
    // Pass valid token in Authorization header as Bearer
    request(app)
    .get(`/api/v1/notes/${USER_ID_1}/${USER_NAME_1}`)
    .set('Authorization', 'Bearer '+token)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.an('array');
      // expect(response.body[0].title).to.equal(config.NOTE_1.title);
      // expect(response.body[0].text).to.equal(config.NOTE_1.text);
      done();
    });
  });

  //  testcase
  it('Should handle a request to get all notes of a user 2', function(done)
  {
    // Should get all note as a array those are created by user 2 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 2
    // Pass valid token in Authorization header as Bearer
    request(app)
    .get(`/api/v1/notes/${USER_ID_2}/${USER_NAME_2}`)
    .set('Authorization','Bearer '+token)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.an('array');
     // expect(response.body[0].title).to.equal(config.NOTE_2.title);
     // expect(response.body[0].text).to.equal(config.NOTE_2.text);
      done();
    }).catch((error) => {
      done(error);
    });

  });

  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function(done)
  {
    // should get blank array
    // status = 200
    // response will be an empty array
    // Pass valid token in Authorization header as Bearer
    request(app)
    .get(`/api/v1/notes/${USER_ID_3}/${USER_NAME_3}`)
    .set('Authorization', 'Bearer '+token)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(0);
      done();
    }).catch((error) => {
      done(error);
    });
  });
});

//  testsuite
describe('Testing to update a note', function()
{
  //  testcase
  it('Should handle a request to update a note by note id', function(done)
  {
    // Should return updated note and match updated note text value'
    // status = 200
    // response will hold updated note as an object
    // Pass valid token in Authorization header as Bearer
    const newText = 'newText for note 1';
    config.NOTE_1.text = newText;
    request(app)
    .put(`/api/v1/notes/updateNotes/${NOTE_ID}`)
    .send(config.NOTE_1)
    .expect(200)
    .then((response) => {
      expect(response.body.title).to.equal(config.NOTE_1.title);
      expect(response.body.text).to.equal(newText);
      done();

    });
  });
});

describe('Negative test scenarios', function() {
    it('Make a API request to a resource with invalid token, which requires authentication, should return forbidden status and error ', function(done) { 
      done(); 
    });
    it('Make a API request to a resource without any token, which requires authentication, should return forbidden status and error ', function(done) {
      done();
    });
});
