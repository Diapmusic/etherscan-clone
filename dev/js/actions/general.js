const superagent = require('superagent')

export const supplyLoading = (bool) => {
  return {
    type: 'LOADING_SUPPLY',
    isLoading: bool
  }
}

export const supplySuccess = (data) => {
  return {
    type: 'LOADED_SUPPLY',
    payload: data
  }
}

export const priceLoading = (bool) => {
  return {
    type: 'LOADING_PRICE',
    isLoading: bool
  }
}

export const priceSuccess = (data) => {
  return {
    type: 'LOADED_PRICE',
    payload: data
  }
}

export const fetchSupply = () => {
  //fetch the total supply of ether
  return (dispatch) => {
    dispatch(supplyLoading(true));

    superagent
      .get('https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=55BU3IFQWCNWSHHPNK9KWE7TIQK7TVXTFI')
      .end((err, response) => {
        if (err) {
          throw Error(response.statusText)
        }
        dispatch(supplyLoading(false));
        dispatch(supplySuccess(response.body.result/1000000000000000000)) //divide by this amount because etherscan.io gives the result back in wei
      })
  };
}


export const fetchPrice = () => {
  //fetch the latest price of ether
  return (dispatch) => {
    dispatch(priceLoading(true));

    superagent
      .get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=55BU3IFQWCNWSHHPNK9KWE7TIQK7TVXTFI')
      .end((err, response) => {
        if (err) {
          throw Error(response.statusText)
        }
        dispatch(priceLoading(false));
        dispatch(priceSuccess(response.body.result))
      })
  };
}