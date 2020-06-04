
import {LEADERS} from '../shared/leaders';

/* reducer function; input is state and action
   Initializing state to LEADERS */
   export const Leaders = (state = LEADERS, action) => {
    switch(action.type) {
        default:
            return state;
    }
}