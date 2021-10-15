import React, { useState } from 'react';
 import styles from './timer.module.css'


const Timer = props => {
    return (  
<div>
<div className={styles.body}> 
    <div className={props.roundsSelected === '5' ? styles.progress5rounds : styles.progress10rounds}>
    <div className={styles.color}></div>
    </div>
    <div className={props.roundsSelected !== '' ? styles.timerbar : styles.hide}>Time Left: {props.seconds}</div>
</div>




</div>
    )
}

export default Timer;





