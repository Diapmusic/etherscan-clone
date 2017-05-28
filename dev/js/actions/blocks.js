const superagent = require('superagent')

const lastTwentyBlocks = (recentHex,blocksLoading,blocksSuccess,dispatch) => {
  var baseTen = parseInt(recentHex);
  var holder = Array(20);
  var index = 0;

  for (var i=(baseTen - 20); i<=baseTen; i++) {
    var urlSubstitute = Number(i).toString(16);
    console.log("Getting block #" + i);

    superagent
      .get('https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x' + urlSubstitute + '&boolean=true&apikey=55BU3IFQWCNWSHHPNK9KWE7TIQK7TVXTFI')
      .end((err, response) => {
        if (err) {
          throw Error(response.statusText)
        }
        console.log("Got block #" + i);
        holder[index] = response.body.result;
        index ++;
        if (index === 20) {
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