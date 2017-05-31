import React, {Component} from 'react';
import {getGraphData} from '../actions/graph';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2'; // uses the react-chartjs-2 package

class Graph extends Component {
  componentDidMount () {
    // on mount, get the graph data
    this.props.getGraphDataGo()
  }
  render() {
    if (this.props.graphLoading) {
        return (<p> Graph Loading... </p>)
    } else {
        var holder = this.props.usdGraphData;
        holder = holder.filter(
          (entry) => {
            var time = new Date(entry.time)
            return(time.getTime()/1000 > (Date.now()/1000 - 1209600))
          });
        var usdXData = holder.map(
          (entry) => {
            var time = new Date(entry.time)
            return(time.getTime()/1000)
        });
        var usdYData = holder.map(
          (entry) => {
            return(entry.usd)
          });
        var data = {
          labels: usdXData,
          datasets: [{
            label: 'Price (USD)',
            data: usdYData,
            pointRadius: 0
          }]
        }
        var options = {
        scales: {
          xAxes: [{
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value, index, values) => {
                var date = new Date(value*1000)
                return (date.getMonth() + '/' + date.getDate())
                }
              }
            }]
          }
        }
        return (
          <Line data={data} options={options} />
          )
      }
  }
}

const mapStateToProps = (state) => {
    return {
        graphLoading: state.graphLoading,
        usdGraphData: state.usdGraphData,
        btcGraphData: state.btcGraphData
    };
}

const matchDispatchToProps = (dispatch) => {
    return {
      getGraphDataGo: () => dispatch(getGraphData())
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Graph);