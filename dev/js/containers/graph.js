import React, {Component} from 'react';
import {getGraphData} from '../actions/graph';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2'; // uses the react-chartjs-2 package

class Graph extends Component {
  componentDidMount () {
    // on mount, get the graph data
    this.props.getGraphDataGo()
  }
  render() {
    if (this.props.graphLoading) {
        return (<p> Graph Loading... </p>)
    } else {
        var xData = [];
        var yData = [];
        for (var i=0;i<this.props.graphData.length;i++) {
          xData.push(this.props.graphData[i].friendlydate);
          yData.push(this.props.graphData[i].y);
        }
        var data = {
          labels: xData,
          datasets: [{
            label: '# of transactions',
            data: yData
          }]
        }
        console.log(xData);
        return (
          <Bar data={data} />
          )
      }
  }
}

const mapStateToProps = (state) => {
    return {
        graphLoading: state.graphLoading,
        graphData: state.graphData
    };
}

const matchDispatchToProps = (dispatch) => {
    return {
      getGraphDataGo: () => dispatch(getGraphData())
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(Graph);