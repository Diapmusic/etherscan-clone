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