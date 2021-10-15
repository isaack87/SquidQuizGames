import React, { useState } from 'react';
import styles from './won.module.css'

const Won = () => {

    return (
        <div className={styles.flexcontainer}>
        <h2 className={styles.title}>  YOU WON THE GAME</h2>
        <h2 className={styles.reset}> <a href="/">Reset Game</a></h2>
            <img
            src="https://media1.giphy.com/media/7HPgM7IltO4QU/giphy.gif?cid=ecf05e47bnwmupt0a5fhft2qz1vq48pvmoh3lnftdd64ht18&rid=giphy.gif&ct=g"
            alt="winner"/>


        </div>
    )
}


export default Won;