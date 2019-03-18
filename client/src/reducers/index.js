import { combineReducers } from 'redux';

const dataReducer = (state = {}, action) => {
    if(action.type === 'DATA')
        return action.payload;

    return state;
};

export default combineReducers({
    data: dataReducer
});
