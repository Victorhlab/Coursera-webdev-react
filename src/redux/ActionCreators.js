/* Import everything (all the exports) that is exported form ActionTypes */
import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes';
import {baseUrl} from '../shared/baseUrl';

/* Define the Action object:  Action has a type property and a payload*/
/* returns a JS object */
/* This is sent to the STORE */
export const addComment = (dishId, rating, author, comment ) =>  ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

/*action creator call */                                     /* since this is a Thunk need to add dispatch here */
export const postComment = (dishId ,rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    /* POST operation */
    return fetch(baseUrl+'comments' , {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response=> {
        if(response.ok) {
            return(response); /* This returns the response to the next .then(...) */
        }
        else{
            /* generate new error object */
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error; //throw and catch error
        }
    }, 
    /* error handler: if the server does not even respond */
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    /* So the postComment sends the comment to the server first. IF this succeeds, then the comment is added */
    .then(response => dispatch(addComment(response)))
    .catch(error=> {console.log('Post comments', error.message) 
                    alert('Your Comment could not be posted: \nError ' + error.message)})
}

/*  Middleware:
    created as a THUNK, returns a fn */
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true)); /* What does this true do here? */

    /* Simulate server */
    /* After 2s dispatch DISHES */
    //setTimeout(()=>{
    //    dispatch(addDishes(DISHES));
    //}, 2000);

    return fetch(baseUrl + 'dishes')
        .then(response=> {
            if(response.ok) {
                return(response); /* This returns the response to the next .then(...) */
            }
            else{
                /* generate new error object */
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error; //throw and catch error
            }
        }, 
        /* error handler: if the server does not even respond */
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        // catch all throws
        .catch(error => dispatch(dishesFailed(error.message))); 

}

/* DISHES */
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

/* return action: type and payload */
export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(response=> {
            if(response.ok) {
                return(response); /* This returns the response to the next .then(...) */
            }
            else{
                /* generate new error object */
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error; //throw and catch error
            }
        }, 
        /* error handler: if the server does not even respond */
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        // catch all throws
        .catch(error => dispatch(commentsFailed(error.message))); 

}

/* COMMENTS */
export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});


/* PROMOTIONS */
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response=> {
            if(response.ok) {
                return(response); /* This returns the response to the next .then(...) */
            }
            else{
                /* generate new error object */
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error; //throw and catch error
            }
        }, 
        /* error handler: if the server does not even respond */
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        // catch all throws
        .catch(error => dispatch(promosFailed(error.message))); 

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

/* return type and payload */
export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
});

/* returns an action */
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});