import React from 'react'
import $ from 'jquery'
import UserTopUI from './userUI.jsx'
import GameRulesUI from './gameRulesUI.jsx'
import Questions from './questions.jsx'
import styles from './game.module.css'


class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            current: this.props.location.state,
            currentRound: 0,
            question: '',
            questionList: [],
            loaded: true
        }
        this.getQuestionAnswers = this.getQuestionAnswers.bind(this)
    }
    async componentDidMount() {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${this.state.current.genreID}&difficulty=${this.state.current.difficulty}&type=multiple`);
        const questions = await response.json();
        this.setState({
            question: questions
        }, () => {      
            this.getQuestionAnswers()
        })
    }

    getQuestionAnswers () {
        const list = this.state.question;
        const questionList = []
        list.results.map(e => {
            questionList.push(e.question)
        })
        this.setState({
            questionList: questionList
        })
    }

    
    //grabs questions based on choices made at start screen
  
    //this if sending props to stateful // no this sending to stateless
    //access props passed dowm in router by props.location.state
    render() {
        return (
            <div>
            <UserTopUI data={this.state.current} />
            <h1 className={styles.title}> WELCOME TO QUIZ GAMES </h1>
            <GameRulesUI data={this.state.current} 
                         round={this.state.currentRound}
            />
            <Questions quiz={this.state.question} questionList={this.state.questionList}/>
            </div>
        )
    }
}

export default Game;