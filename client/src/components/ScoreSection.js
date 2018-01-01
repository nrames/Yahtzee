import React, { Component } from 'react';
import { Segment, List, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ScoreRow from './ScoreRow';

class ScoreSection extends Component {
  total = (score, label) => {
    return (
      <List.Item key={label}>
        <Header floated="left">{label}</Header>
        <Header
          floated="right"
          style={{ marginRight: '20px' }}
        >
          {score}
        </Header>
      </List.Item>
    )
  }

  generateTotals = () => {
    const UPPER_BONUS_LIMIT = 63;
    const BONUS = 35;

    let { currentGame: { scores }, label } = this.props;
    const sectionScores = []
    const sectionTotal = scores.filter( s => s.section === label.toLowerCase() ).reduce( (total, entry) => {
      let score = entry.score || 0
      return total + score; }, 0)
    sectionScores.push(this.total(sectionTotal, 'Section Total'))

    if (label === 'Upper') {
      const bonus = sectionTotal >= UPPER_BONUS_LIMIT ? BONUS : 0
      sectionScores.push(this.total(bonus, 'Bonus'))
      sectionScores.push(this.total(bonus + sectionTotal, 'Total Score'))
    }
  }

  render() {
    let { label, currentGame: { scores } } = this.props;
    return(
      <Segment basic>
        <Header as="h3">{label} Section</Header>
        <List divided>
          { scores.filter( s => s.section === label.toLowerCase() ).map( (score, i) => {
              return <ScoreRow key={i} {...score} />
            })
          }
          { this.generateTotals() }
        </List>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentGame: state.currentGame }
}

export default connect(mapStateToProps)(ScoreSection);