import React, { useState } from 'react';
import styles from './lost.module.css'

const Lost = () => {

    return (
        <div className={styles.center}>
            <img 
            src="https://media1.giphy.com/media/J2xMuBFMLH0SOYdZP1/giphy.gif?cid=ecf05e47u7a48buh9tpt2onrizpbn3fyyrz3p0lwts9ge539&rid=giphy.gif&ct=g"
            alt="loser"/>

            <h2> <div className={styles.c}><a href="/">Reset Game</a></div> </h2>
        </div>
    )
}
    
    
export default Lost;