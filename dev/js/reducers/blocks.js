export function blocksLoading (state = true, action) {
  switch (action.type) {
    case 'LOADING_BLOCKS':
      return action.isLoading;
    
    default:
      return state;
  }
}

export function blocksLoaded (state = null, action) {
  switch (action.type) {
    case 'LOADED_BLOCKS':
      return action.payload;
    
    default:
      return state;
  }
}