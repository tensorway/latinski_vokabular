import React from 'react';
import { Button, Box, Grid, Typography, Card, LinearProgress } from '@material-ui/core';
import AppBar from '../src/AppBar'
import { api_name } from '../src/constants'



export default class QuestionView extends React.Component {
    constructor(props) {
        super(props);
        this.vocab_id = "nan";
        this.weights = [];
        this.high_value = 3;
        this.high_cap = 4;
        this.question = ["loading", "wait"];
        this.curriq = 0;
        this.newquestion = true;
        this.last_time = new Date().getTime();
        this.sum = 100;
        this.nzero = 0;
    }
    state = {
        vocab_list: [['loading', 'wait']],
        onquestion: true,
        reverse: "none",
        // newquestion: true,
    }

    randomq() {
        let tmp = []
        // let sum = 0;
        this.sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            tmp[i] = this.sum;
            this.sum += this.weights[i];
        }
        var rand = Math.random() * this.sum;
        let iq = -1;
        for (iq = 0; iq < tmp.length-1; iq++)
            if (rand < tmp[iq])
                break;
        if (iq === -1)
            return ["loading", "wait"]
        return this.state.vocab_list[iq];
    }

    set_weights(n, value) {
        for (let i = 0; i < n; i++)
            this.weights[i] = value;
    }

    fetch_data(vocab_id) {
        fetch(api_name + 'vocab?id=' + vocab_id)
            .then(res => res.json())
            .then(data => { this.setState({ vocab_list: data["questions"] }); this.newquestion = true; })
            .then(() => this.vocab_id = vocab_id)
            .then(() => this.set_weights(this.state.vocab_list.length, this.high_value))
            .catch((error) => { console.error('Error:', error); });
    }

    post_data(x) {
        fetch(api_name + 'data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: x,
        })
            .then(response => response.json())
            // .then(data => console.log('Success:', data))
            .catch((error) => console.error('Error:', error));
    }

    render() {
        if (this.vocab_id !== this.props.vocab_id)
            this.fetch_data(this.props.vocab_id)

        if (this.newquestion)
            this.question = this.randomq();
        this.newquestion = false;
        let question = this.question[0]
        let answer = this.question[1]
        if (this.state.reverse === true){
            let tmp1 = question;
            question = answer
            answer = tmp1
        }
        let card = 0;
        if (this.state.onquestion)
            card = this.Question(question)
        else
            card = this.Answer(question, answer)

        if (this.state.reverse === "none")
            card =  <Grid container spacing={4} direction='column' alignItems='center' justify='center' style={{ padding: 70 }}>
                    <Grid item>
                        <Button size='large' variant='contained' color='primary' onClick={()=> this.setState({reverse:false})}>lat -> hrv</Button>
                    </Grid>
                    <Grid item>
                        <Button size='large' variant='contained' color='secondary' onClick={()=> this.setState({reverse:true})}>hrv -> lat</Button>
                    </Grid>
                </Grid>
        if (this.nzero >= this.state.vocab_list.length)
            card = <Typography variant='h3'> OVER </Typography>

        return (
            <Box>
                <Grid container spacing={4} direction='column'>
                    <Grid item>
                        <AppBar />
                    </Grid>
                    <Grid item>
                        {card}
                    </Grid>
                </Grid>
            </Box>
        )
    }

    Question(question) {
        return (
            <Grid container spacing={20} direction='column' alignItems='center' >
                <Grid container spacing={4} direction='column' alignItems='center' style={{ padding: 70 }}>
                    <Grid item>
                        <Typography variant='h3'>{question}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h3'>____</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} direction='column' alignItems='center' style={{ height: '60vh' }}>
                    <Button color="primary" variant="contained" size='large' onClick={() => this.turn_card_handler()}>
                        Prikazi rjesenje
                </Button>
                </Grid>
                <Grid container item xs={12}>
                    {/* <Typography variant='h5'>progress</Typography> */}
                    <LinearProgress style={{ width: '100%' }} variant="determinate" value={this.nzero/this.state.vocab_list.length*100}/>
                    <LinearProgress style={{ width: '100%' }} variant="determinate" color='secondary' value={100-this.nzero/this.state.vocab_list.length*100} />
                </Grid>
            </Grid>
        )
    }

    Answer(question, answer) {
        return (
            <Card>
                <Grid container spacing={20} direction='column' alignItems='center'>
                    <Grid container spacing={4} direction='column' alignItems='center' style={{ padding: 70 }}>
                        <Grid item>
                            <Typography variant='h3'>{question}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h3'>{answer}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} direction='column' alignItems='center' style={{ height: '60vh' }}>
                        <Grid item>
                            <Button color="primary" variant="contained" size='large' onClick={() => this.lose_handler(question, answer)}>ponovi</Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="contained" size='large' onClick={() => this.ok_handler(question, answer)}> relativno ok  </Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="contained" size='large' onClick={() => this.super_handler(question, answer)}>nauceno</Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        {/* <Typography variant='h5'>progress</Typography> */}
                        <LinearProgress style={{ width: '100%' }} variant="determinate" value={this.nzero/this.state.vocab_list.length*100}/>
                        <LinearProgress style={{ width: '100%' }} variant="determinate" color='secondary' value={100-this.nzero/this.state.vocab_list.length*100} />
                    </Grid>
                </Grid>
            </Card>
        )
    }

    turn_card_handler() {
        this.setState({ onquestion: false })
    }

    new_card_handler(question, answer, label) {
        let time = new Date().getTime();
        let dt = time - this.last_time
        let content = {
            'time': time,
            'delta_time': dt,
            'question': question,
            'answer': answer,
            'label': label,
        }
        this.post_data(JSON.stringify(content))
        this.newquestion = true;
        this.setState({ onquestion: true })
    }

    lose_handler(question, answer) {
        this.weights[this.curriq] = this.sum / 5;
        this.new_card_handler(question, answer, 'lose');
    }

    ok_handler(question, answer) {
        this.weights[this.curriq] = this.sum / 10;
        this.new_card_handler(question, answer, 'ok');
    }

    super_handler(question, answer) {
        this.weights[this.curriq] = 0;
        this.nzero += 1
        this.new_card_handler(question, answer, 'super');
    }
}