import React from 'react'
import $ from 'jquery'
import UserTopUI from './userUI.jsx'
import Questions from './questions.jsx'
import styles from './game.module.css'


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            current: this.props.location.state
        }
    }

    render() {
        return (
            <div className={styles.bg}>
            <UserTopUI data={this.state.current} />
            <h1 className={styles.title}> Choose Wisely </h1>
             <Questions state={this.state.current}/>
            </div>
        )
    }
}

export default Game;