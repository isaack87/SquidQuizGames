import React, { useState } from 'react';
 import styles from './timer.module.css'


const Timer = props => {
    return (
<div>


<div className={styles.body}>
    <div className={props.roundsSelected === '5' ? styles.progress5rounds : styles.progress10rounds}>
    <div className={styles.color}>
    </div>
</div>

<div className={styles.timerbar }>
    
    <div className={styles.wrapper}>
    <div className={styles.d} onClick={props.hint}> Use a Hint: 🔮</div>
    </div>

    <div className={styles.b}>Time Left: {props.seconds} </div>

    <div className={styles.wrapper}>
    <div className={styles.d} onClick={props.skipQ}> Skip: ❓</div>
    </div>

</div>






</div>
</div>
    )
}

export default Timer;




