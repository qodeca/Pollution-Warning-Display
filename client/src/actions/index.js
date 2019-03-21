export const pollutionData = data => {
    return {
        type: 'DATA',
        payload: data
    }
};

export const advertisementsData = data => {
    return {
        type: 'ADS_LIST',
        payload: data
    }
};

export const selectedAdvertisement = data => {
    return {
        type: 'SELECTED_AD',
        payload: data
    }
};

export const timeToSkipAd = data => {
    return {
        type: 'AD_TIME',
        payload: data
    }
};

export const timeToSkipInfo = data => {
    return {
        type: 'INFO_TIME',
        payload: data
    }
};
