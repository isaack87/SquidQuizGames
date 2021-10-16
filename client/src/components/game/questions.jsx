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
            hintSelected: false,
            hintArray: [],
            count: 0,
            lives: ['💖','💖','💖'],
            hints: ['🔮','🔮'],
            skipQ: ['❓','❓'],
            score: 0,
            round: 0,
            roundsSelected: this.props.state.rounds,
            shuffled: [],
            lost: false,
            won: false,
            loaded: false,
            questionsLeft: this.props.state.rounds,
            seconds: 1
        }
    this.getQuestionAnswers = this.getQuestionAnswers.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.playerChoice = this.playerChoice.bind(this)
    this.getIntialQuestionsAPI = this.getIntialQuestionsAPI.bind(this)
    this.correctAnimation = this.correctAnimation.bind(this)
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.encode64 = this.encode64.bind(this);
    this.encode64Nested = this.encode64Nested.bind(this);
    this.removeHint = this.removeHint.bind(this);
    this.skipQ = this.skipQ.bind(this)
    }

 componentDidMount() {
    if (this.state.roundsSelected === "50") {
        this.getIntialQuestionsAPI()
        this.startTimer()
        this.setState({
            seconds: 300,
            lives: ['💖','💖','💖','💖','💖'],
            hints: ['🔮','🔮','🔮','🔮'],
            skipQ: ['❓','❓','❓','❓']
        })
     }
     if (this.state.roundsSelected === "5") {
        this.getIntialQuestionsAPI()
        this.startTimer()
        this.setState({
            seconds: 30 * this.props.state.rounds,
            lives: ['💖','💖','💖'],
            hints: ['🔮','🔮'],
            skipQ: ['❓','❓']
        })
     }
     if (this.state.roundsSelected === "10") {
        this.getIntialQuestionsAPI()
        this.startTimer()
        this.setState({
            seconds: 30 * this.props.state.rounds,
            lives: ['💖','💖','💖','💖'],
            hints: ['🔮','🔮','🔮'],
            skipQ: ['❓','❓','❓']
        })
     }

    
}

componentDidUpdate(){    
    setTimeout(() => this.setState({correct: false}), 5000);

    if (this.state.seconds === 0 && this.state.roundsSelected !== '') {
            this.setState({
                lost: true,
                lostRedirect: "/lost"
            })
    }
  }

  componentWillUnmount(){
    //shows correct image and goes away after timeout
        setTimeout(() => this.setState({correct: false}), 5000);
    }


 // helper function to remove 1 addtime when used
 skipQ() {
    if (this.state.skipQ.length > 0) {
        this.setState((prevState) => ({
            skipQ: this.state.skipQ.slice(1),
            answer: this.state.answer.slice(1),
            questions: this.state.questions.slice(1),
            count: prevState.count + 1,
            round: prevState.round + 1
        }));
    } else {
        alert(' you are out of question skips')
    }
  }
  
  // helper function to remove 1 hint when used
  removeHint() {
    if (this.state.hints.length > 0) {
    let temp = []
    //this array contains the correct answer along with 1 incorret
    let hintArray = []

    for (let i =0; i < this.state.choices.length; i++) {
        if (this.state.choices[0][this.state.round].includes(this.state.answer[0])) {
            let test = this.state.choices[0][this.state.round]
            test.forEach(e => {
                if (e !== this.state.answer[0]) {
                    temp.push(e)
                } else {
                    hintArray.push(e)
                }
            })
        }
    }
    this.setState({
        hints: this.state.hints.slice(1),
        hintSelected: true,
        hintArray: hintArray.concat(temp[0])
    })
    } else {
        alert(' You are out of hints')
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
      seconds: seconds
    });
  }

    //gets intial questions on game load once
    async getIntialQuestionsAPI () {

    if (this.state.loaded === false) {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${this.props.state.genreID}&difficulty=${this.props.state.difficulty}&type=multiple&encode=base64`);
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

  //takes a  array of strings and converts encode64 to text
  encode64 (array) {
        var Buffer = require('buffer').Buffer
        let result = []
        for (let i =0; i < array.length; i++) {
            result.push(Buffer.from(array[i], 'base64').toString('ascii'))
        }
        return result
  }

  //takes a  nested array of strings and converts encode64 to text
  encode64Nested (array) {
    var Buffer = require('buffer').Buffer
    let transformed = []
    let finalArray = []

    for (let i =0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            transformed.push(Buffer.from(array[i][j], 'base64').toString('ascii'))
    }
}
    for (let k = 0; k < transformed.length; k += 4) {
        let  chunk = transformed.slice(k, k+4)
        finalArray.push(chunk)
    }
    return finalArray
}

// grabs API data and structures question, answer
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
            questions: this.encode64(questions),
            answer: this.encode64(answer),
            choices: [this.encode64Nested(choices)]
        })
}

  //validates player choice if right or wrong
  playerChoice(e) {
    e.preventDefault();
    if (e.target.value === this.state.answer[0]) {
        this.correctAnimation()
        this.setState((prevState) => ({
            answer: this.state.answer.slice(1),
            questions: this.state.questions.slice(1),
            count: prevState.count + 1,
            round: prevState.round + 1,
            score: prevState.score + 1,
            correct: true,
            questionsLeft: prevState.questionsLeft - 1,
            hintSelected: false
        }))
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
        imageURL = "https://c.tenor.com/ZoZqWaSnN5UAAAAi/diwali-sparkles-stars.gif";
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
               seconds={this.state.seconds}
               hint={this.removeHint}
               skipQ={this.skipQ}/>
               
    
        <div className={styles.flexcontainer}>
            {/* Animation fireworks if answer correct */}
        <img className={styles.correctimg} src={this.state.correct === true ? this.correctAnimation() : null}/>

            {/* QUESTION TITLE HERE */}
         <span className={styles.question}>{this.state.questions[0]}</span>
       


        {this.state.choices.map(e => {
        return (
        <div>
            <h1 className={this.state.hintSelected ? styles.showhint : styles.hidehint }>
                Answer is- <b>{this.state.hintArray[0]} or {this.state.hintArray[1]}</b>
            </h1>
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
        </div>
        </div>
        )
        }
    }


export default Questions;