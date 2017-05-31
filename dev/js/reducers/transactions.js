export function txnSelected (state = false, action) {
  switch (action.type) {
    case 'TXN_SELECTED':
      return action.isSelected;

    default:
      return state;
  }
}

export function activeTxn (state = null, action) {
  switch (action.type) {
    case 'TXN_ACTIVATED':
      return action.activeTxn;

    default:
      return state;
  }
}

export function txnLoading (state = true, action) {
  switch (action.type) {
    case 'TXN_LOADING':
      return action.payload;

    default:
      return state;
  }
}

export function txnReceipt (state = null, action) {
  switch (action.type) {
    case 'TXN_RECEIPT':
      return action.payload;

    default:
      return state;
  }
}