import React, {Component} from 'react';
import {fetchBlocks,selectBlock,activateBlock} from '../actions/blocks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const beautifyTime = (unixtime) => {
  // etherscan.io provides timestamps in unix format, so this converts it to regular format.
    var holder = new Date(Number(unixtime) * 1000)
    return (holder.toString());
  }

class Blocks extends Component {
  componentDidMount () {
    // on mount, get the most recent 20 blocks.
    this.props.fetchBlocksGo()
  }

  getActiveBlock (blockNumber) {
    // when a user clicks a block, get the block info and display it.
    var activeBlock = null;
    if (blockNumber) {
      this.props.blockList.map(
          (block) => {
            if (block.number === blockNumber) {
              activeBlock = block
            }
          }
        )
    };
    if (activeBlock) {
      return (
        <div className='blockInfo'>
          <table>
          <tbody>
            <tr>
              <th>Timestamp</th>
              <td>{beautifyTime(activeBlock.timestamp)}</td>
            </tr>
            <tr>
              <th>Transactions</th>
              <td>{activeBlock.transactions.length} transactions in this block</td>
            </tr>
            <tr>
              <th>Hash</th>
              <td>{activeBlock.hash}</td>
            </tr>
            <tr>
              <th>Mined By</th>
              <td>{activeBlock.miner}</td>
            </tr>
            <tr>
              <th>Difficulty</th>
              <td>{parseInt(activeBlock.difficulty,16).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Total Difficulty</th>
              <td>{parseInt(activeBlock.totalDifficulty,16).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Size</th>
              <td>{parseInt(activeBlock.size,16).toLocaleString()} bytes</td>
            </tr>
            <tr>
              <th>Gas Limit</th>
              <td>{parseInt(activeBlock.gasLimit,16).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Gas Used</th>
              <td>{parseInt(activeBlock.gasUsed,16).toLocaleString()}</td>
            </tr>
          </tbody>
          </table>
        </div>  
        );
    } else {
      return (<p> Nothing here... </p>)
    }
  }

  renderBlocks() {
    // function to render each individual block
    if (this.props.blocksLoading) {
      return (<p>'Fetching blocks...'</p>);
    }

    return (
      this.props.blockList.map((block) => {
        return (
          <div key={block.number} className='block' 
          onClick={
            () => {
              this.props.selectBlockGo(true);
              this.props.activateBlockGo(block.number);
              }
            }>
            <b>Block Number:</b> {parseInt(block.number,16)}
            <br />
            <span>
              <b>{beautifyTime(parseInt(block.timestamp,16))}</b>
            </span>
          </div>
          )
      })
      );
  }

  render() {
    // put all the rendered blocks into a little scrollable div
    if (this.props.blocksLoading) {
      return (<p>'Fetching blocks...'</p>);
    }
    return (
      <div>
        <div className='blockContainer'> 
        {this.renderBlocks()}
        </div>
        <div className={this.props.blockSelected ? 'modalBackground' : 'displayOff'}>
          <div>
            <span onClick={
            () => {
              this.props.selectBlockGo(false);
              this.props.activateBlockGo(null);
              }}> X </span>
            <h3>Block Information</h3>
            <hr />
            <div>
              {this.getActiveBlock(this.props.activeBlock)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        blocksLoading: state.blocksLoading,
        blockList: state.blockList,
        blockSelected: state.blockSelected,
        activeBlock: state.activeBlock
    };
}

const matchDispatchToProps = (dispatch) => {
    return {
      fetchBlocksGo: () => dispatch(fetchBlocks()),
      selectBlockGo: (bool) => dispatch(selectBlock(bool)),
      activateBlockGo: (blockNumber) => dispatch(activateBlock(blockNumber)),
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Blocks);