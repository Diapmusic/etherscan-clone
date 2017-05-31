import React, {Component} from 'react';
import {fetchSupply,fetchPrice} from '../actions/general'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const beautifyTime = (unixtime) => {
    var holder = new Date(Number(unixtime) * 1000)
    return (holder.toString());
  }

class GeneralInfo extends Component {
  componentDidMount () {
    // on mount, get the most recent supply and price
    this.props.fetchSupplyGo()
    this.props.fetchPriceGo()
  }

  render() {
    if (this.props.supplyLoading || this.props.priceLoading || this.props.blocksLoading) {
      return (<p>'Fetching stats...'</p>);
    }
    return (
      <table className='infoBox'>
        <tbody>
          <tr>
            <th className='subheading'>Total Supply</th>
            <th className='subheading'>Market Cap</th>
          </tr>
          <tr>
            <td className='regular'>{Number(this.props.ethSupply).toLocaleString()} ether</td>
            <td className='regular'>${Number(this.props.priceInfo.ethusd * this.props.ethSupply).toLocaleString()} USD</td>
          </tr>
          <tr>
            <th className='subheading'>Price (BTC)</th>
            <th className='subheading'>Price (USD)</th>
          </tr>
          <tr>
            <td className='regular'>{this.props.priceInfo.ethbtc}</td>
            <td className='regular'>{this.props.priceInfo.ethusd}</td>
          </tr>
          <tr>
            <td className='timestamp'>
              ... as of {beautifyTime(this.props.priceInfo.ethbtc_timestamp)}
            </td>
            <td className='timestamp'>... as of {beautifyTime(this.props.priceInfo.ethusd_timestamp)}</td>
          </tr>
          <tr>
            <th className='subheading'>Last Block Mined:</th>
            <th className='subheading'>Total Network Difficulty</th>
          </tr>
          <tr>
            <td className='regular'>{parseInt(this.props.blockList[0].number, 16)}</td>
            <td className='regular'>{parseInt(this.props.blockList[0].totalDifficulty, 16).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>);
  }
}

const mapStateToProps = (state) => {
    return {
        ethSupply: state.ethSupply,
        supplyLoading: state.supplyLoading,
        priceLoading: state.priceLoading,
        priceInfo: state.priceInfo,
        blocksLoading: state.blocksLoading,
        blockList: state.blockList
    };
}

const matchDispatchToProps = (dispatch) => {
    return {
      fetchSupplyGo: () => dispatch(fetchSupply()),
      fetchPriceGo: () => dispatch(fetchPrice())
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(GeneralInfo);