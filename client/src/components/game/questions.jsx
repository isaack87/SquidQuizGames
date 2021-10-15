import React, { useState } from 'react';
import { BrowserRouter as Link, Redirect} from "react-router-dom";
import styles from './questions.module.css'
import GameRulesUI from './gameRulesUI.jsx'
import Timer from './timer.jsx'


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
            lives: ['💖','💖','💖'],
            score: 0,
            round: 1,
            roundsSelected: this.props.state.rounds,
            shuffled: [],
            lost: false,
            won: false,
            loaded: false,
            questionsLeft: this.props.state.rounds,
            seconds: 30 * this.props.state.rounds

        }
    this.getQuestionAnswers = this.getQuestionAnswers.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.playerChoice = this.playerChoice.bind(this)
    this.getIntialQuestionsAPI = this.getIntialQuestionsAPI.bind(this)
    this.correctAnimation = this.correctAnimation.bind(this)
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    }

 componentDidMount() {
     if (this.state.roundsSelected !== "") {
        this.getIntialQuestionsAPI()
        this.startTimer()
     } else { 
        this.getIntialQuestionsAPI()
     }
}

componentDidUpdate(){
    setTimeout(() => this.setState({correct: false}), 2000);
    if (this.state.seconds === 0 && this.state.roundsSelected !== '') {
            this.setState({
                lost: true,
                lostRedirect: "/lost"
            })
    }
  }

  //helper functions for countdown
  startTimer() {
    if (this.state.seconds > 0) {
      this.setState({
          seconds: setInterval(this.countDown, 1000)
      }) 
    }
    this.countDown()
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });
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
        console.log(e.correct_answer)
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
            correct: true,
            questionsLeft: prevState.questionsLeft - 1
        }));
    } else {
        this.setState({
            lives: this.state.lives.slice(1)
        });
    }

    if (e.target.value !== this.state.answer[0] && this.state.lives.length === 1) {
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
                     questionsLeft={this.state.questionsLeft}
            />
        <Timer roundsSelected= {this.state.roundsSelected}
               seconds={this.state.seconds}/>

        <div className={styles.flexcontainer}>   
         <span className={styles.question}>{this.state.questions[0]}</span>
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