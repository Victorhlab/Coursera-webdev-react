/* Import everything (all the exports) that is exported form ActionTypes */
import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes';

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



/*  Middleware:
    created as a THUNK, returns a fn */
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true)); /* What does this true do here? */

    /* After 2s dispatch DISHES */
    setTimeout(()=>{
        dispatch(addDishes(DISHES));
    }, 2000);
}

/* return type */
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

/* return type and payload */
export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});