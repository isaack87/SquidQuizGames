import React, { useState } from 'react';
import styles from './userUI.module.css'

const UserTopUI = props => {

    //automatically generate player# between 1-456
    const [random, setRandom] = useState(Math.floor(Math.random() * 457))
    
    //access props passed dowm in router by props.location.state
        return (
        <div className={styles.topbar}>
            <div className={styles.left}>Player Name: {props.data.playerName} #{random}</div>
            <div className={styles.right}><a href="/">Reset Game</a></div>
        </div>
        )
    }


export default UserTopUI;