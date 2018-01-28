var ChatServerActionCreators = require('../actions/ChatServerActionCreators');

var qwest                    = require('qwest');

module.exports = {
  createRoom: function(room) {
    qwest.post('/rest/Item', {
      room: room,
      limit:10
    },{
      responseType: 'json'
    }).then(function(response){
      ChatServerActionCreators.createdRoom(response);
    }).catch(function(response){
      console.log('error', response);
      //alert('error', response);
    });
  },
  createMessage: function(message) {
    qwest.post('/rest/Item/' + message.roomId + '/messages', {
      message: message
    },{
      responseType: 'json'
    }).then(function(response) {
      ChatServerActionCreators.createdMessage(response);
    }).catch(function(response) {
      console.log('error', response);
      //alert('error', response);
    });
  },
  getRooms: function() {
    qwest.get('/rest/Item',{},{
      responseType: 'json'
    }).then(function(response){
      console.log(response);
      ChatServerActionCreators.fetchedRooms(response.response.data);
    }).catch(function(response){
      console.log('error', response);
      //alert('error', response);
    });
  },
  getMessages: function() {
    qwest.get('/rest/Item', {}, {
      responseType: 'json'
    }).then(function(response) {
      ChatServerActionCreators.fetchedMessages(response);
    }).catch(function(response) {
      console.log('error', response);
      //alert('error', response);
    });
  },
  getUser: function() {
    qwest.get('/rest/Pack', {}, {
      responseType: 'json'
    }).then(function(response) {
      ChatServerActionCreators.createdUser(response);
    }).catch(function(response) {
      console.log('error', response);
      //alert('error', response);
    });
  },
  createUser: function(email) {
    qwest.post('/rest/Item', {
      user: {
        email: email
      }
    }, {
      responseType: 'json'
    }).then(function(response) {
      ChatServerActionCreators.createdUser(response);
    }).catch(function(response) {
      console.log('error', response);
      //alert('error', response);
    });
  }
};
