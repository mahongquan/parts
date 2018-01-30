//import  ChatWebAPIUtils  from '../utils/ChatWebAPIUtils';
import Client from "./Client";
import  keyMirror from 'keymirror';
var Dispatcher    = require('flux').Dispatcher;
var EventEmitter      = require('events').EventEmitter;
var _                 = require('underscore');
var ActionTypes= keyMirror({
    // CREATING_ITEM: null,
    // CREATED_ITEM: null,
    // FETCHING_ITEMS: null,
    FETCHED_ITEMS: null,
    SHOW_EDIT:null,
    // NEW_ITEM: null,
    UPDATED_ITEM: null
  })
// ,

//   PayloadSources: keyMirror({
//     VIEW_ACTION: null,
//     SERVER_ACTION: null,
//     SOCKET_ACTION: null
//   })
// };
// /////////////////////////////////
// var ActionTypes       = ChatConstants.ActionTypes;

var ItemActionCreators= {
  showEdit: function(data) {/////////////////////////  1 action=>dispatch   ///////////////////
    console.log(data);
        ChatAppDispatcher.dispatch({
          type: ActionTypes.SHOW_EDIT,
          para: data
        });
  },
  getItems: function(data) {/////////////////////////  1 action=>dispatch   ///////////////////
    console.log(data);
    Client.items(
      data
      ,(res)=>{
        res.start=data.start;
        ChatAppDispatcher.dispatch({
          type: ActionTypes.FETCHED_ITEMS,
          para: res
        });
      }
    );
  },
  updateItem: function(data) {
    console.log(data);
    Client.put("/rest/Item",
      data
      ,(res)=>{
        ChatAppDispatcher.dispatch({
          type: ActionTypes.UPDATED_ITEM,
          para: res
        });
      }
    );
  }
};
////////////////////////////////////////////////////////////////////////////////
//var PayloadSources = ChatConstants.PayloadSources;

var ChatAppDispatcher =new Dispatcher()
//  _.extend(new Dispatcher(), {
//   handleViewAction: function(action) {
//     var payload = {
//       source: PayloadSources.VIEW_ACTION,
//       action: action
//     };
//     this.dispatch(payload);
//   },
//   handleServerAction: function(action) {/////////////////////step two//////////////////////////////////////////
//     var payload = {
//       source: PayloadSources.SERVER_ACTION,
//       action: action
//     };
//     this.dispatch(payload);
//   },
//   handleSocketAction: function(action) {
//     var payload = {
//       source: PayloadSources.SOCKET_ACTION,
//       action: action
//     };
//     this.dispatch(payload);
//   }
// });

////////////////////////////////////////////////////////////////////////////
var _items = [];
var _total=0;
var _start=0;
var _item=null;
var CHANGE_EVENT = 'change';
var _error=null;
//var ActionTypes = ChatConstants.ActionTypes;

// var sortItems = function() {
//   _items = _.sortBy(_items, function(item) {
//     return item.updatedAt;
//   }).reverse();
// };

class ItemStore  {
  // constructor(){
  //   //this.store=new myflx.ItemStore();
  // }
  static eventEmitter = new EventEmitter()
  // static getCreatedItemData=(item)=>{
  //   //var date = Date.now();
  //   return {
  //     id:            item.id ,
  //     name:           item.name,
  //     bh:item.bh,
  //     guige:item.guige,
  //     danwei:item.danwei,
  //     image:item.image
  //   };
  // }
  static getCurrent=()=>{
    console.log("getCurrent");
    console.log(_item);
    return _items[_item];
  }
  static getError=()=>{
    return _error;
  }
  static getAll=()=> {
    return [_items,_total,_start];
  }
  //emitShowEdit
  static emitShowEdit=()=> {
    ItemStore.eventEmitter.emit("showedit");
  }
  static emitEditChange=()=> {
    ItemStore.eventEmitter.emit("editChange");
  }
  static emitEditError=()=> {
    ItemStore.eventEmitter.emit("editError");
  }
  static emitChange=()=> {
    ItemStore.eventEmitter.emit(CHANGE_EVENT);
  }
  static addChangeListener= (callback)=> {
    ItemStore.eventEmitter.on(CHANGE_EVENT, callback);
  }
  static removeChangeListener=(callback)=> {
    ItemStore.eventEmitter.removeListener(CHANGE_EVENT, callback);
  }
  static dispatchToken = ChatAppDispatcher.register(function(payload) {
    var action = payload;

    switch(action.type) {
      // case ActionTypes.CREATING_ITEM:
      //   var conversation = ItemStore.getCreatedItemData({
      //     name: action.name
      //   });
      //   _items.push(conversation);
      //   ItemStore.emitChange(); 
      //   break;
      // case ActionTypes.CREATED_ITEM:
      //   _items = _.map(_items, function(item) {
      //     if (item.name === action.item.name) {
      //       return action.item;
      //     } else {
      //       return item;
      //     }
      //   });
      //   ItemStore.emitChange();
      //   break;
      case ActionTypes.SHOW_EDIT:
        console.log(action);
        _item=action.para;
        ItemStore.emitShowEdit();//////////////////////     3 store=>view            //////////////////////////////////////////
        break;
      case ActionTypes.FETCHED_ITEMS:////////////////     2  dispatch=>store        ///////////////////////////////////////////////
        console.log(action);
        _items = _.map(action.para.data, ItemStore.getCreatedItemData);
        _total=action.para.total;

        if (action.para.start){
          _start=action.para.start;
        }
        else{
          _start=0;
        }
        ItemStore.emitChange();//////////////////////     3 store=>view            //////////////////////////////////////////
        break;
      // case ActionTypes.CLICKING_ITEM:
      //   _items = _.map(_items, function(item) {
      //     if (item._id === action.item._id) {
      //       item.isCurrent = true;
      //     } else {
      //       item.isCurrent = false;
      //     }
      //     return item;
      //   });
      //   ItemStore.emitChange();
      //   break;
      case ActionTypes.UPDATED_ITEM:
        console.log(action);
        if (action.para.success){
           _items[_item] = action.para.data;
           ItemStore.emitChange();
           ItemStore.emitEditChange();
        }
        else{
          _error=action.para.message();
          ItemStore.emitEditError();
        }
        break;

      default:
    }
  });
}
var myflux={ItemStore,ItemActionCreators};
export default myflux;
