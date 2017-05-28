import React, {Component} from 'react';
import {fetchBlocks} from '../actions/blocks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const beautifyTime = (unixtime) => {
    var holder = new Date(Number(unixtime) * 1000)
    return (holder.toString());
  }

class Blocks extends Component {
  componentDidMount () {
    this.props.fetchBlocksGo()
  }

  renderBlocks() {
    if (this.props.blocksLoading) {
      return (<p>'Fetching blocks...'</p>);
    }

    var orderedBlockList = [];
    var unorderedBlockList = this.props.blockList;
    unorderedBlockList.map((block) => {
      orderedBlockList.push(block)
    });
    orderedBlockList = orderedBlockList.sort((a,b) => {
      return parseInt(a.timestamp) - parseInt(b.timestamp)});

    return (
      orderedBlockList.map((block) => {
        return (
          <li key={block.hash} className='regular'>
            {block.hash}
            <br />
            <span>
              {beautifyTime(parseInt(block.timestamp,16))}
            </span>
          </li>
          )
      })
      );
  }

  render() {
    if (this.props.blocksLoading) {
      return (<p>'Fetching blocks...'</p>);
    }
    return (
      <ul> {this.renderBlocks()} </ul>
      )
  }
}

const mapStateToProps = (state) => {
    return {
        blocksLoading: state.blocksLoading,
        blockList: state.blockList
    };
}

const matchDispatchToProps = (dispatch) => {
    return {
      fetchBlocksGo: () => dispatch(fetchBlocks())
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Blocks);