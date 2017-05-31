const superagent = require('superagent')

export const selectTxn = (bool) => {
  return {
    type: 'TXN_SELECTED',
    isSelected: bool
  }
}

export const activateTxn = (txnNumber) => {
  return {
    type: 'TXN_ACTIVATED',
    activeTxn: txnNumber
  }
}

export const txnLoading = (bool) => {
  return {
    type: 'TXN_LOADING',
    payload: bool
  }
}

export const txnReceipt = (data) => {
  return {
    type: 'TXN_RECEIPT',
    payload: data
  }
}

export const getTxnReceipt = (txnHash) => {
  return (dispatch) => {
    dispatch(txnLoading(true))

    superagent
      .get('https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash='+txnHash+'&apikey=YourApiKeyToken')
      .end((err, res) => {
        if (err) {
          throw Error(res.statusText)
        }
        dispatch(txnReceipt(res.body.result));
        dispatch(txnLoading(false))
      })
  }
}