import * as ActionTypes from './ActionTypes';



/* before: reducer function; input is state and action
   Initializing state to DISHES */
/* Now: State is not DISHES anymore,
   now it has 3 properties, isLoading, errMess, dishes[] */
export const Dishes = (state = {
        /* init to true */
        isLoading: true,
        errMess: null,
        dishes:[]

    }, action) => {
    switch(action.type) {

        case ActionTypes.ADD_DISHES:
            return {...state, isLoading:false, errMess: null, dishes:action.payload}
        
        case ActionTypes.DISHES_LOADING:
            /* spread operator ... from ES6 */
            /* take in the current state, followed by modifications of the state */
            /* State will not be mutated */
            
            /* Returns a new object from the current state */
            /* Therefor it returns an immutable */
            return {...state, isLoading:true, errMess:null, dishes: []};

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading:false, errMess: action.payload, dishes:[]}

        default:
            console.log("hallo from DISHES");
            return state;
    }
}