const superagent = require('superagent')

export const graphLoading = (bool) => {
  return {
    type: 'LOADING_GRAPH',
    isLoading: bool
  }
}

export const usdSuccess = (data) => {
  return {
    type: 'LOADED_USD',
    payload: data
  }
}

export const btcSuccess = (data) => {
  return {
    type: 'LOADED_BTC',
    payload: data
  }
}

export const getGraphData = () => {

  /*gets the graph data from etherscan.io, instead of api.etherscan.io. for some reason, the same-origin rule prevents localhost:3000 from accessing etherscan.io, so as a workaround, you can install this chrome extension: 

  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

  which will make things work. the reason i didn't want to make the call to api.etherscan.io is because i would have to trawl through hundreds of thousands of blocks to get the transaction counts and it seemed a little unwieldy. i will get around to it though!  */

  return (dispatch) => {
    dispatch(graphLoading(true));

    superagent
      .get('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_ETH&start=1495594023&end=9999999999&period=14400')
      .end((err, res) => {
        if (err) {
          throw Error(res.statusText)
        }
        dispatch(btcSuccess(res.body))
      })

    superagent
      .get('https://etherchain.org/api/statistics/price')
      .end((err, res) => {
        if (err) {
          throw Error(res.statusText)
        }
        dispatch(usdSuccess(res.body.data))
        dispatch(graphLoading(false))
      })
    }
  }
/*
const getBlockTxn = (blockNumber) => {

}

const getGraphData = (latestBlockNumber) => {
  var timeNow = Date.now()/1000;
  var index = 0;
  var counter = latestBlockNumber;
  var holder = [];

  while (index < 1) {
  var blockHex = Number(counter).toString(16)

  superagent
    .get('https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x' + blockHex + '&boolean=true&apikey=55BU3IFQWCNWSHHPNK9KWE7TIQK7TVXTFI')
    .end((err, res) => {
      if (err) {
        throw Error(res.statusText)
      }
      var blockTime = parseInt(res.body.result.timestamp,16);
      var difference = timeNow - blockTime;
      if (difference < (index+1) * 86400) {
        holder[index] = holder[index] + res.body.result.transactions.length;
      } else {
        index ++;
        holder[index] = holder[index] + res.body.result.transactions.length;
      }
      counter --
    })
  }
  
  console.log(holder);
}
*/









