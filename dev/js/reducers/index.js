import {combineReducers} from 'redux';
import {supplyLoading,supplyLoaded,priceLoading,priceLoaded} from './general';
import {blocksLoading,blocksLoaded} from './blocks';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    ethSupply: supplyLoaded,
    supplyLoading: supplyLoading,
    priceLoading: priceLoading,
    priceInfo: priceLoaded,
    blocksLoading: blocksLoading,
    blockList: blocksLoaded,
});

export default allReducers
