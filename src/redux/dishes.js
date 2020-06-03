import {DISHES} from '../components/shared/dishes';

/* reducer function; input is state and action
   Initializing state to DISHES */
export const Dishes = (state = DISHES, action) => {
    switch(action.type) {
        default:
            console.log("hallo from DISHES");
            return state;
    }
}