import React, { useState } from 'react';
import styles from './gameRulesUI.module.css'

const GameRulesUI = props => {
    
    //access props passed dowm in router by props.location.state
        return (
        <div className={styles.userbar}>
            <div className={styles.a}>Difficulty Level: {props.data.difficulty}</div>
            <div className={styles.b}>Topic Selected: {props.data.genre}</div>
            <div className={styles.c}>Rounds#: {props.round}</div>
        </div>
        )
    }


export default GameRulesUI;