import {createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
/* For middleware */
import {applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {createForms} from 'react-redux-form'
import {InitialFeedback} from './forms'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            /* react redux form reducer fn: */
            ...createForms({
                feedback: InitialFeedback
            }) 
        }),
        /* pass enhancers to our store */
        applyMiddleware(thunk, logger)
    );
    return store;
}