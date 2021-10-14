import React, { useState } from 'react';
import styles from './gameRulesUI.module.css'

const GameRulesUI = props => {

    //automatically generate player# between 1-456
    const [random, setRandom] = useState(Math.floor(Math.random() * 457))
  
    //access props passed dowm in router by props.location.state
        return (
        <div className={styles.userbar}>
            <div className={styles.a}>Player Name: {props.data.playerName} #{random} </div>
            <div className={styles.a}>Difficulty Level: {props.data.difficulty}</div>
            <div className={styles.b}>Topic Selected: {props.data.genre}</div>
            <div className={styles.c}>Lives left: {props.info.lives}</div>
            <div className={styles.c}>Score: {props.info.score}</div>
            <div className={styles.c}>Rounds#: {props.info.round} out of {props.data.rounds}</div>
            <div className={styles.a}><a href="/">Reset Game</a></div>
        </div>
        )
    }

export default GameRulesUI;