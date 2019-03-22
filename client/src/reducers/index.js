import { combineReducers } from 'redux';

const dataReducer = (state = [], action) => {
    if(action.type === 'DATA')
        return action.payload;

    return state;
};

const adsReducer = (state = [], action) => {
    if(action.type === 'ADS_LIST')
        return action.payload;

    return state;
};

const selectAdReducer = (state = 0, action) => {
    if(action.type === 'SELECTED_AD')
        return action.payload;

    return state;
};

const timeToSkipAdReducer = (state = 10000, action) => {
    if(action.type === 'AD_TIME')
        return action.payload;

    return state;
};

const timeToSkipInfoReducer = (state = 60000, action) => {
    if(action.type === 'INFO_TIME')
        return action.payload;

    return state;
};

export default combineReducers({
    data: dataReducer,
    ads: adsReducer,
    selected: selectAdReducer,
    adTime: timeToSkipAdReducer,
    infoTime: timeToSkipInfoReducer
});
