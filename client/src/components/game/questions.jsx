import React, { useState } from 'react';
import styles from './questions.module.css'

class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quiz: '',
            questionList: this.props.questionList,
            answer: '',
            choices: [],
            loaded: false
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

        render() {
        return (
        <div className={styles.flexcontainer}>
          {/* {this.state.question} */}
        </div>
        )           
        }
    }


export default Questions;