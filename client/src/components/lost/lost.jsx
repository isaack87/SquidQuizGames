import React, { useState } from 'react';
import styles from './lost.module.css'

const Lost = () => {

    return (
        <div className={styles.flexcontainer}>
        <h2 className={styles.title}>  YOU LOST THE GAME</h2>
        <h2 className={styles.reset}> <a href="/">Reset Game</a></h2>

            <img
            src="https://media1.giphy.com/media/J2xMuBFMLH0SOYdZP1/giphy.gif?cid=ecf05e47u7a48buh9tpt2onrizpbn3fyyrz3p0lwts9ge539&rid=giphy.gif&ct=g"
            alt="loser"/>
        </div>

    )
}


export default Lost;