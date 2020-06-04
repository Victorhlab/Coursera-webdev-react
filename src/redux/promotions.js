
import * as ActionTypes from './ActionTypes';

/* reducer function; input is state and action
   Initializing state to DISHES */
   export const Promotions = (state = {
       isLoading: true,
       errMess: null,
       promotions: [],
    }, action) => {
    switch(action.type) {

        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading:false, errMess: null, promotions: action.payload}
        
        case ActionTypes.PROMOS_LOADING:
            /* spread operator ... from ES6 */
            /* take in the current state, followed by modifications of the state */
            /* State will not be mutated */
            
            /* Returns a new object from the current state */
            /* Therefor it returns an immutable */
            return {...state, isLoading:true, errMess:null, promotions: []};

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading:false, errMess: action.payload, promotions:[]}

        default:
            return state;
    }
}