import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Header, List, Container, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

const styles = {
  scroller: { height: '80vh', overflow: 'auto' }
}

class Scores extends React.Component {
  state = { scores: [], page: 1, total_pages: 0 }

  componentDidMount() {
    axios.get('/api/scores')
      .then( res => {
        let { scores, total_pages } = res.data;
        this.setState({ scores, total_pages })
        this.props.dispatch({ type: 'HEADERS', headers: res.headers })
      })
  }

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/scores?page=${page}`)
      .then( res => {
        this.setState( state => {
          return { scores: [...state.scores, ...res.data.scores], page }
        });
        this.props.dispatch({ type: 'HEADERS', headers: res.headers });
      });
  }

  render() {
    let { scores, page, total_pages } = this.state;
    return (
      <Container>
        <List divided style={styles.scroller}>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={ page < total_pages }
            loader={<Loader />}
            userWindow={false}
          >
          { scores.map( s =>
            <List.Item key={s.id}>
              <List.Content>
                <List.Header>{s.value}</List.Header>
                <List.Description>{s.email}</List.Description>
              </List.Content>
            </List.Item>
          )
        }
        </InfiniteScroll>
        </List>
      </Container>         
    )
  }
}

export default connect()(Scores);