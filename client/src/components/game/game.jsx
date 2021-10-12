import React from 'react'
import UserTopUI from './userUI.jsx'
import GameRulesUI from './gameRulesUI.jsx'
import styles from './game.module.css'

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            current: this.props.location.state,
            currentRound: 0
        }
    }

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
            


            </div>
        )
    }
}

export default Game;