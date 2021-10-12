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
            round: 1,
            shuffled: [],
            lost: false,
            won: false,
            loaded: false
        }
    this.getQuestionAnswers = this.getQuestionAnswers.bind(this)
    // this.shuffle = this.shuffle.bind(this)
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
this.setState({
    shuffled: this.shuffle(this.state.choices[0][0])
    })
}

getQuestionAnswers () {
    const list = this.state.questionList;
    const questions = []
    const answer = []
    const choices = []

    list.results.map(e => {
        questions.push(e.question)
        answer.push(e.correct_answer)
        choices.push([].concat(e.incorrect_answers, e.correct_answer))
    })
    this.setState({
        questions: questions,
        answer: answer,
        choices: [choices]
    })

}
//     //shuffle choices to be random everytime
//     shuffle(array) {
//     let currentIndex = array.length,  randomIndex;
//     // While there remain elements to shuffle...
//     while (currentIndex != 0) {
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }
//     return array;
//   }

  playerChoice(e) {
    e.preventDefault();
    if (e.target.value === this.state.answer[0]) {
        alert('correct')
        this.setState((prevState) => ({
            answer: this.state.answer.slice(1),
            questions: this.state.questions.slice(1),
            count: prevState.count + 1,
            round: prevState.round + 1
        }));
    }
    if (e.target.value !== this.state.answer[0]) {
        alert('WRONG')
        this.setState({
            lost: true,
            lostRedirect: "/lost"
        })    
    }
    if (this.state.round === 10) {
        alert('YOU WON')
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
         <ul>
         {this.state.questions[0]}
         </ul>
        {this.state.choices.map(e => {
        return (
        <div>
            <ul>
                <button onClick={this.playerChoice} value={e[this.state.count][0]}> {e[this.state.count][0]} </button>
            </ul>
            <ul>
                <button onClick={this.playerChoice} value={e[this.state.count][1]}> {e[this.state.count][1]} </button>
            </ul>
            <ul>
                <button onClick={this.playerChoice} value={e[this.state.count][2]}> {e[this.state.count][2]} </button>
            </ul>
            <ul>
                <button onClick={this.playerChoice} value={e[this.state.count][3]}> {e[this.state.count][3]} </button>
            </ul>
        </div>
        )
         })}
        </div>
        </div>
        )           
        }
    }


export default Questions;