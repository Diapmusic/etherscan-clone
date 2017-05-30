import React from 'react';
import GeneralInfo from '../containers/general';
import Blocks from '../containers/blocks';
import Txns from '../containers/transactions';
import Graph from '../containers/graph';
import styles from '../../scss/style.scss';

const App = () => (
    <div>
      <div className='section'>
        <h3>General Info</h3>
        <div>
          <GeneralInfo />
        </div>
      </div>
      <div className='section'>
        <h3>Transactions over the Last 14 Days</h3>
        <div>
          <Graph />
        </div>
      </div>
      <div className='section'>
        <h3>Most Recent Blocks</h3>
        <Blocks />
      </div>
      <div className='section'>
        <h3>Most Recent Transactions</h3>
        <Txns />
      </div>
    </div>
);

export default App;
