import {combineReducers} from 'redux';
import {supplyLoading,supplyLoaded,priceLoading,priceLoaded} from './general';
import {blocksLoading,blocksLoaded,blockSelected,activeBlock} from './blocks';
import {graphLoading,graphLoaded} from './graph';
import {txnSelected,activeTxn} from './transactions';

// just some redux stuff, combining all the reducers so the store can have all the info

const allReducers = combineReducers({
    ethSupply: supplyLoaded,
    supplyLoading: supplyLoading,
    priceLoading: priceLoading,
    priceInfo: priceLoaded,
    blocksLoading: blocksLoading,
    blockList: blocksLoaded,
    blockSelected: blockSelected,
    activeBlock: activeBlock,
    activeTxn: activeTxn,
    txnSelected: txnSelected,
    graphLoading: graphLoading,
    graphData: graphLoaded
});

export default allReducers
