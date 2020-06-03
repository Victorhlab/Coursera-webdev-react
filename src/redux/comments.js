import {COMMENTS} from '../components/shared/comments';


/* reducer function; input is state and action
   Initializing state to COMMENTS */
   export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        default:
            return state;
    }
}