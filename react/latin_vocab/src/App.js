import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Grid, Button, Container, Typography, Box } from '@material-ui/core'
import AppBar from '../src/AppBar'
import QuestionView from '../src/QuestionView'
import { api_name } from '../src/constants'


export default class App extends React.Component {
  state = {
    vocab_id: -1,
  }
  render() {
    if (this.state.vocab_id === -1)
      return this.MainView();
    return <QuestionView vocab_id={this.state.vocab_id} />
  }

  MainView() {
    return (
      <Box>
        <AppBar />
        <Grid container spacing={5} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh' }}>
          <Grid container item spacing={10} alignItems='center' justify='center'>
            <Grid item>
              <Button color="primary" variant="contained" size='large' onClick={() => this.set_vid(0)}>1 vokab</Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained" size='large' onClick={() => this.set_vid(1)}>2 vokab</Button>
            </Grid>
          </Grid>
          <Grid container item spacing={10} alignItems='center' justify='center'>
            <Grid item>
              <Button color="primary" variant="contained" size='large' onClick={() => this.set_vid(2)}>3 vokab</Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained" size='large' onClick={() => this.set_vid(3)}>4 vokab</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  set_vid(vid){
    this.setState({vocab_id: vid})
  }
}

// export default App;
