import React, { Component } from 'react';
import ScoreSection from './ScoreSection';

class ScoreCard extends Component {
  render() {
    return(
      <div>
          <ScoreSection label="Upper" />
          <ScoreSection label="Lower" />
      </div>
    )
  }
}

export default ScoreCard;