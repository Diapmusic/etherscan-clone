export function graphLoading (state = true, action) {
  switch (action.type) {
    case 'LOADING_GRAPH':
      return action.isLoading;
    
    default:
      return state;
  }
}

export function graphLoaded (state = null, action) {
  switch (action.type) {
    case 'LOADED_GRAPH':
      return action.payload;
    
    default:
      return state;
  }
}
