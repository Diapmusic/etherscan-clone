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

export function blockSelected (state = false, action) {
  switch (action.type) {
    case 'BLOCK_SELECTED':
      return action.isSelected;

    default:
      return state;
  }
}

export function activeBlock (state = null, action) {
  switch (action.type) {
    case 'BLOCK_ACTIVATED':
      return action.activeBlock;

    default:
      return state;
  }
}