export function graphLoading (state = true, action) {
  switch (action.type) {
    case 'LOADING_GRAPH':
      return action.isLoading;
      break;
    
    default:
      return state;
  }
}

export function usdSuccess (state = null, action) {
  switch (action.type) {
    case 'LOADED_USD':
      return action.payload;
      break;

    default:
      return state;
  }
}

export function btcSuccess (state = null, action) {
  switch (action.type) {
    case 'LOADED_BTC':
      return action.payload;
      break;

    default:
      return state;
  }
}

