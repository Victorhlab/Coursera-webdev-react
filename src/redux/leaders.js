

import * as ActionTypes from './ActionTypes';
import {LEADERS} from '../shared/leaders';

/* reducer function; input is state and action
   Initializing state to LEADERS */
   export const Leaders = (state =  {
                                        isLoading: true,
                                        errMess: null,
                                        leaders: [],
                                    }, action) => {

        switch(action.type) {

            case ActionTypes.LEADERS_LOADING:
                return {...state, isLoading:true, errMess:null, leaders: []};
            
            case ActionTypes.ADD_LEADER:
                return {...state, isLoading:false, errMess: null, leaders: action.payload}

            case ActionTypes.LEADER_FAILED:
                return {...state, isLoading:false, errMess: action.payload, leaders:[]}
                
            default:
                return state;
        }
}