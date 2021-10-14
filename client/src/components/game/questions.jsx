import React, { useState } from 'react';
import { BrowserRouter as Link, Redirect} from "react-router-dom";
import styles from './questions.module.css'
import GameRulesUI from './gameRulesUI.jsx'


class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lostRedirect: null,
            wonRedirect: null,
            questionList: '',
            questions: '',
            answer: '',
            choices: [],
            count: 0,
            lives: 3,
            score: 0,
            round: 1,
            roundsSelected: this.props.state.rounds,
            shuffled: [],
            lost: false,
            won: false,
            loaded: false
        }
    this.getQuestionAnswers = this.getQuestionAnswers.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.playerChoice = this.playerChoice.bind(this)
    }

async componentDidMount() {

    if (this.state.loaded === false) {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${this.props.state.genreID}&difficulty=${this.props.state.difficulty}&type=multiple`);
    const questions = await response.json();
    this.setState({
        questionList: questions
    }, () => {
        this.getQuestionAnswers()
    })
}
}

//helper function to sort answers to always be different position
shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


getQuestionAnswers () {
    const list = this.state.questionList;
    const questions = []
    const answer = []
    const choices = []

    list.results.map(e => {
        questions.push(e.question)
        answer.push(e.correct_answer)
        choices.push(this.shuffle(e.incorrect_answers.concat(e.correct_answer)))
        console.log(choices, '😂')
    })

        this.setState({
            questions: questions,
            answer: answer,
            choices: [choices]
        })

}

  playerChoice(e) {
    e.preventDefault();
    if (e.target.value === this.state.answer[0]) {
        this.setState((prevState) => ({
            answer: this.state.answer.slice(1),
            questions: this.state.questions.slice(1),
            count: prevState.count + 1,
            round: prevState.round + 1,
            score: prevState.score + 1
        }));
    } else {
        this.setState((prevState) => ({
            lives: prevState.lives - 1
        }));
    }


    if (e.target.value !== this.state.answer[0] && this.state.lives <= 1) {
        this.setState({
            lost: true,
            lostRedirect: "/lost"
        })
    }
    if (this.state.round == this.state.roundsSelected) {
        this.setState({
            won: true,
            wonRedirect: "/won"
        })
    }
  }

        render() {
        //takes you to loser screen
        if (this.state.lostRedirect) {
            return <Redirect to={this.state.lostRedirect} />
        }
        if (this.state.wonRedirect) {
            return <Redirect to={this.state.wonRedirect} />
        }

        return (
        <div>
        <GameRulesUI data= {this.props.state}
                     round={this.state.round}
            />
        <div className={styles.flexcontainer}>
            <h3> Lives remaining: {this.state.lives} </h3>
            <h3> How many you got correct {this.state.score} </h3>
         <ul>
         {this.state.questions[0]}
         </ul>
        {this.state.choices.map(e => {
        return (
        <div>
            <ul>
                <button className={styles.animation} onClick={this.playerChoice}  value={e[this.state.count][0]}> {e[this.state.count][0]} </button>
            </ul>
            <ul>
                <button className={styles.animation} onClick={this.playerChoice} value={e[this.state.count][1]}> {e[this.state.count][1]} </button>
            </ul>
            <ul>
                <button className={styles.animation} onClick={this.playerChoice} value={e[this.state.count][2]}> {e[this.state.count][2]} </button>
            </ul>
            <ul>
                <button className={styles.animation} onClick={this.playerChoice} value={e[this.state.count][3]}> {e[this.state.count][3]} </button>
            </ul>
        </div>
        )
         })}
        </div>



        <canvas id="myCanvas"></canvas>



        </div>
        )
        }
    }


export default Questions;