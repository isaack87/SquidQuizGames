import React, { useState } from 'react';
import styles from './gameRulesUI.module.css'

const GameRulesUI = props => {

    //automatically generate player# between 1-456
    const [random, setRandom] = useState(Math.floor(Math.random() * 457))

    //access props passed dowm in router by props.location.state
        return (
        <div className={styles.userbar}>
            <div className={styles.a}>Name: {props.data.playerName} #{random} </div>
            <div className={styles.a}>Difficulty: {props.data.difficulty}</div>
            <div className={styles.a}>Topic: {props.data.genre}</div>
            <div className={styles.b}>50/50 Guess: {props.info.hints}</div>
            <div className={styles.b}>Lives left: {props.info.lives}</div>
            <div className={styles.c}>Score: {props.info.score}</div>
            <div className={styles.c}>Questions Left: {props.questionsLeft}</div>
            <div className={styles.c}><a href="/">Reset Game</a></div>
        </div>
        )
    }

export default GameRulesUI;