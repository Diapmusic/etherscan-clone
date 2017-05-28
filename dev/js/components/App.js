import React from 'react';
import GeneralInfo from '../containers/general';
import Blocks from '../containers/blocks';
import styles from '../../scss/style.scss';

const App = () => (
    <div>
      <div>
        <h3>General Info</h3>
        <GeneralInfo />
      </div>
      <br />
      <div>
        <h3>Most Recent Blocks</h3>
        <Blocks />
      </div>
    </div>
);

export default App;
