import { createStore } from 'redux'
import Client from "./Client";
var ActionTypes= {
    FETCHED_ITEMS: "FETCHED_ITEMS",
    FETCHING_ITEMS: "FETCHING_ITEMS",
    SHOW_EDIT:"SHOW_EDIT",
    HIDE_EDIT:"HIDE_EDIT",
    UPDATED_ITEM: "UPDATED_ITEM"
  }
function reducer(state = {error:null,showedit:false,_item:null,items:[],toal:0,start:0}, action) {
  // console.log(action);
  switch (action.type) {
    case ActionTypes.UPDATED_ITEM:
        // console.log(action);
        if (action.para.success){
           state.items[state._item] = action.para.data;
        }
        else{
          state.error=action.para.message();
        }
        return state
    case ActionTypes.HIDE_EDIT:
      state.showedit=false;
      return state;
    case ActionTypes.FETCHED_ITEMS:
        state.items =action.para.data;
        state.total=action.para.total;
        if (action.para.start){
          state.start=action.para.start;
        }
        else{
          state.start=0;
        }
      return state
    case ActionTypes.SHOW_EDIT:
      state.showedit=true;
      state._item=action.para;
      return state
    default:
      return state
  }
}
var ItemStore=createStore(reducer);
var ItemActionCreators= {
  showEdit: function(data) {/////////////////////////  1 action=>dispatch   ///////////////////
    // console.log(data);
        ItemStore.dispatch({
          type: ActionTypes.SHOW_EDIT,
          para: data
        });
  },
  hideEdit: function(data) {/////////////////////////  1 action=>dispatch   ///////////////////
    // console.log(data);
        ItemStore.dispatch({
          type: ActionTypes.HIDE_EDIT,
          para: data
        });
  },
  getItems: function(data) {/////////////////////////  1 action=>dispatch   ///////////////////
    // console.log(data);
    Client.items(
      data
      ,(res)=>{
        res.start=data.start;
        ItemStore.dispatch({
          type: ActionTypes.FETCHED_ITEMS,
          para: res
        });
      }
    );
  },
  updateItem: function(data) {
    // console.log(data);
    Client.put("/rest/Item",
      data
      ,(res)=>{
        ItemStore.dispatch({
          type: ActionTypes.UPDATED_ITEM,
          para: res
        });
      }
    );
  }
};
var myflux={ItemStore,ItemActionCreators};
export default myflux;
