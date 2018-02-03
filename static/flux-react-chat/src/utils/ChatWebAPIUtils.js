import Client from './Client';
import ChatServerActionCreators from '../actions/ChatServerActionCreators';
var qwest= require('qwest');
export default {
  createRoom: function(data) {
    Client.postOrPut("/rest/Item",data,(res) => {
      ChatServerActionCreators.createdRoom(res.data);
      // console.log(res);
      //   this.setState({contact:res.data});
      //   this.parent.handlePackItemChange(this.index,res.data);
      //   this.old=res.data;
      //   this.close();
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
