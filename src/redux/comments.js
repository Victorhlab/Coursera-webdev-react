import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';

/* reducer function; input is state and action
   Initializing state to COMMENTS */
   export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            /* the server should generate the comment id */
            comment.id   = state.length;
            comment.date = new Date().toISOString();

            /* remember: cannot mod the state we are sent in as parameter,
               we can add to it and return the modified version of it. But cannot directly 
               change (mutate) the state */
            
            /* state.concat: pushes in the new element into the array as a new object that can return*/
            /* immutable object: */
            return state.concat(comment); 
             
        default:
            return state;
    }
}