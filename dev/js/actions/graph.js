const superagent = require('superagent')

export const graphLoading = (bool) => {
  return {
    type: 'LOADING_GRAPH',
    isLoading: bool
  }
}

export const graphSuccess = (data) => {
  return {
    type: 'LOADED_GRAPH',
    payload: data
  }
}

export const getGraphData = () => {

  /*gets the graph data from etherscan.io, instead of api.etherscan.io. for some reason, the same-origin rule prevents localhost:3000 from accessing etherscan.io, so as a workaround, you can install this chrome extension: 

  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

  which will make things work. the reason i didn't want to make the call to api.etherscan.io is because i would have to trawl through hundreds of thousands of blocks to get the transaction counts and it seemed a little unwieldy. i will get around to it though!  */

  return (dispatch) => {
    dispatch(graphLoading(true));
    var re = new RegExp('data:(.*),');

    superagent
      .get('https://etherscan.io/')
      .end((err, res) => {
        if (err) {
          throw Error(res.statusText)
        }
        var data = re.exec(res.text)[1];
        // clean up the data to make it JSON.parse-able
        data = data.replace(/{y/g,'{"y"');
        data = data.replace(/dt/g,'"dt"');
        data = data.replace(/friendlydate/g,'"friendlydate"');
        data = data.replace(/'/g,'"');
        data = data.replace(/,  /g,'');
        data = data.replace(',]', ']');
        dispatch(graphSuccess(JSON.parse(data)))
        dispatch(graphLoading(false))
      })
    }
  }

