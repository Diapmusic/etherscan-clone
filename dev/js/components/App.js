import React from 'react';
import GeneralInfo from '../containers/general';
import Blocks from '../containers/blocks';
import styles from '../../scss/style.scss';

const App = () => (
    <div className='bigDiv'>
      <h3>General Info</h3>
      <div>
        <GeneralInfo />
      </div>
      <br />
      <h3>Most Recent Blocks</h3>
      <Blocks />
    </div>
);

export default App;
