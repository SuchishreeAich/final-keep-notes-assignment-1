const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const expect = require('chai').expect;
let NOTIFICATION_ID = '';

//  testsuite
describe('Testing to add a notification', function()
{
  //  testcase
  it('Should handle a request to add a notification', function(done)
  {
    // Response body should have a key as notifiction
    // status code = 201

    request(app)
    .post(`/api/v1/notifications/reminders/?userId=${config.USER_ID_1}`)
    .send(config.NOTIFICATION_1)
    .expect(201)
    .then((response)=>{
      NOTIFICATION_ID = response.body.notification.notificationID;
      //console.log('notification',NOTIFICATION_ID);
      expect(response.body).to.have.property('notification');
      done();
    });

  });
 
});

//  testsuite
describe('Testing to get a notification', function()
{
  //  testcase
  it('Should handle a request to get a notification', function(done)
  {
    // Response body should have a key as notifiction
    // status code = 201

    request(app)
    .get(`/api/v1/notifications/reminders/${NOTIFICATION_ID}`)
    .expect(200)
    .then((response)=>{
      //NOTIFICATION_ID = response.body.notification.notificationID;
      //console.log('notification',NOTIFICATION_ID);
      expect(response.body).to.have.property('notifications');
      done();
    });

  });
 
});