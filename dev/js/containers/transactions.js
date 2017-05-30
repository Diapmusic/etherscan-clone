import React, {Component} from 'react';
import {selectTxn,activateTxn} from '../actions/transactions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const beautifyTime = (unixtime) => {
    var holder = new Date(Number(unixtime) * 1000)
    return (holder.toString());
  }

class Txns extends Component {

  getActiveTxn (txnNumber) {
    // when the user clicks on a transaction, get the info and display it
    var activeTxn = null;
    if (txnNumber) {
      this.props.blockList.map(
          (block) => {
            return (block.transactions.map((txn) => {
              if (txn.hash === txnNumber) {
                activeTxn = txn
              }
            }))
          })
      console.log(activeTxn);
    }
    if (activeTxn) {
      return (
        <div className='blockInfo'>
          <table>
          <tbody>
            <tr>
              <th>Transaction Hash</th>
              <td>{activeTxn.hash}</td>
            </tr>
            <tr>
              <th>Block Height</th>
              <td>{parseInt(activeTxn.blockNumber, 16)}</td>
            </tr>
            <tr>
              <th>From</th>
              <td>{activeTxn.from}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{activeTxn.to}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{activeTxn.value/1000000000000000000} ETH</td>
            </tr>
            <tr>
              <th>Gas Limit</th>
              <td>{parseInt(activeTxn.gas,16).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Gas Price</th>
              <td>{(parseInt(activeTxn.gasPrice,16)/1000000000000000000)} ETH</td>
            </tr>
            <tr>
              <th>Nonce</th>
              <td>{parseInt(activeTxn.nonce,16)}</td>
            </tr>
          </tbody>
          </table>
        </div>  
        );
    } else {
      return (<p> Nothing here... </p>)
    }
  }

  renderTxns() {
    // this was pretty unwieldy. i had originally intended just to return the last 20 or so transactions but i got lazy, so the list of transactions is all the transactions from the most recent 20 blocks.
    return (
      this.props.blockList.map((block) => {
        if (block.transactions.length > 1) {
          return (
            block.transactions.map((txn) => {
              return (
                <div key={txn.hash} className='block' 
                onClick={
                  () => {
                    this.props.selectTxnGo(true);
                    this.props.activateTxnGo(txn.hash);
                    }
                  }>
                Transaction Hash: {txn.hash}
                <br />
                <span>
                  {beautifyTime(parseInt(block.timestamp,16))}
                </span>
              </div>
              )
            })
          )
        }
     })
    )
  }
            

  render() {
    // put the transactions into a little scrollable div
    if (!this.props.blockList) {
      return (<p>'Fetching transactions...'</p>);
    }
    return (
      <div>
        <div className='blockContainer'> 
        {this.renderTxns()}
        </div>
        <div className={this.props.txnSelected ? 'modalBackground' : 'displayOff'}>
          <div>
            <span onClick={
              () => {
                this.props.selectTxnGo(false);
                this.props.activateTxnGo(null);
                }}> X </span>
            <h3>Transaction Information</h3>
            <hr />
            <div>
              {this.getActiveTxn(this.props.activeTxn)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      blockList: state.blockList,
      activeTxn: state.activeTxn,
      txnSelected: state.txnSelected
    };
}

const matchDispatchToProps = (dispatch) => {
    return {
      selectTxnGo: (bool) => dispatch(selectTxn(bool)),
      activateTxnGo: (txnNumber) => dispatch(activateTxn(txnNumber)),
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Txns);