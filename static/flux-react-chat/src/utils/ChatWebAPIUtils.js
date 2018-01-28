import Client from './Client';
import ChatServerActionCreators from '../actions/ChatServerActionCreators';
var qwest= require('qwest');
export default {
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
  getRooms: function(message) {
    //console.log(search);
    Client.items(
        message.search
        ,(res)=>{
          console.log(res);
          ChatServerActionCreators.fetchedRooms(res.data);
        }
      );
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
