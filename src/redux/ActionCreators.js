/* Import everything (all the exports) that is exported form ActionTypes */
import * as ActionTypes from './ActionTypes';

/* Define the Action object:  Action has a type property and a payload*/
/* returns a JS object */
/* This is sent to the STORE */
export const addComment = (dishId, rating, author, comment ) =>  ({
    type: ActionTypes.ADD_COMMENT,
    payload:  {
        /* payload : input Param */
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

/* this is sent as an action to comment.js, dishes.js, leaders.js, promotions.js */