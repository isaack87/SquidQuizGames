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
            correct: false,
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
    this.getIntialQuestionsAPI = this.getIntialQuestionsAPI.bind(this)
    this.correctAnimation = this.correctAnimation.bind(this)
    }

 componentDidMount() {
     this.getIntialQuestionsAPI()
}

componentDidUpdate(){
    setTimeout(() => this.setState({correct: false}), 2000);
  }


//gets intial questions on game load once
async getIntialQuestionsAPI () {
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
            score: prevState.score + 1,
            correct: true
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
    if (this.state.round == this.state.roundsSelected && this.state.round !== '') {
        this.setState({
            won: true,
            wonRedirect: "/won"
        })
    }
  }

  //correct animation appears below question to indicate a
  correctAnimation() {
    let imageURL = '';
    if (this.state.correct === true) {
        imageURL = "https://media1.giphy.com/media/UXgf6pu1LlQp6CPDi0/giphy.gif?cid=ecf05e47p1qyq9h6zrtijex1inknhzpdlul8m1gib53favd1&rid=giphy.gif&ct=g";
    } else {
        imageURL = "";
        }    
    return imageURL
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
                     info={this.state}
                     getIntialQuestionsAPI={this.getIntialQuestionsAPI}

            />
        <div className={styles.flexcontainer}>
  
         <ul className={styles.question}>
         {this.state.questions[0]}
         </ul>
        {this.state.choices.map(e => {
        return (
        <div>
            <ul>
                <button className={styles.animation}  onClick={this.playerChoice} value={e[this.state.count][0]}> A. {e[this.state.count][0]} ☂️</button>
            </ul>
            <ul>
                <button className={styles.animation} onClick={this.playerChoice} value={e[this.state.count][1]}> B. {e[this.state.count][1]} ⭐</button>
            </ul>
            <ul>
                <button className={styles.animation} onClick={this.playerChoice} value={e[this.state.count][2]}> C. {e[this.state.count][2]} ⭕</button>
            </ul>
            <ul>
                <button className={styles.animation} onClick={this.playerChoice} value={e[this.state.count][3]}> D. {e[this.state.count][3]} 🔺</button>
            </ul>
        </div>
        )
         })}
                
           <img className={styles.correct} src={this.correctAnimation()}/>
     

        </div>
        </div>
        )
        }
    }


export default Questions;