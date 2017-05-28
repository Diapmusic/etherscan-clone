export function supplyLoading (state = true, action) {
  switch (action.type) {
    case 'LOADING_SUPPLY':
      return action.isLoading;
    
    default:
      return state;
  }
}

export function supplyLoaded (state = null, action) {
	switch (action.type) {
    case 'LOADED_SUPPLY':
      return action.payload;
    
    default:
      return state;
  }
}

export function priceLoading (state = true, action) {
  switch (action.type) {
    case 'LOADING_PRICE':
      return action.isLoading;
    
    default:
      return state;
  }
}

export function priceLoaded (state = null, action) {
  switch (action.type) {
    case 'LOADED_PRICE':
      return action.payload;
    
    default:
      return state;
  }
}