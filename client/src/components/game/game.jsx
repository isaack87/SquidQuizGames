import React from 'react'
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
             <Questions state={this.state.current}/>
            </div>
        )
    }
}

export default Game;