const superagent = require('superagent')

const lastTwentyBlocks = (recentHex,blocksLoading,blocksSuccess,dispatch) => {
  var baseTen = parseInt(recentHex);
  var holder = [];
  var index = 0;

  for (var i=(baseTen - 19); i<(baseTen+1); i++) {
    var urlSubstitute = Number(i).toString(16);

    superagent
      .get('https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x' + urlSubstitute + '&boolean=true&apikey=55BU3IFQWCNWSHHPNK9KWE7TIQK7TVXTFI')
      .end((err, response) => {
        if (err) {
          throw Error(response.statusText)
        }
        holder.push(response.body.result);
        index ++;
        if (index === 20) {
          holder.sort((a,b) => {
            return (parseInt(b.timestamp) - parseInt(a.timestamp))
          });
          dispatch(blocksSuccess(holder))
          dispatch(blocksLoading(false))
        };
      })
  }
}

export const blocksLoading = (bool) => {
  return {
    type: 'LOADING_BLOCKS',
    isLoading: bool
  }
}

export const blocksSuccess = (data) => {
  return {
    type: 'LOADED_BLOCKS',
    payload: data
  }
}

export const fetchBlocks = () => {
  return (dispatch) => {
    dispatch(blocksLoading(true));

    superagent
      .get('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=55BU3IFQWCNWSHHPNK9KWE7TIQK7TVXTFI')
      .end((err, response) => {
        if (err) {
          throw Error(response.statusText)
        }
        lastTwentyBlocks(response.body.result,blocksLoading,blocksSuccess,dispatch);
      })
  };
}

export const selectBlock = (bool) => {
  return {
    type: 'BLOCK_SELECTED',
    isSelected: bool
  }
}

export const activateBlock = (blockNumber) => {
  return {
    type: 'BLOCK_ACTIVATED',
    activeBlock: blockNumber
  }
}