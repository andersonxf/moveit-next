import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countDownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);

    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] =useState(false);

    const minutes = Math.floor(time / 60);

    const seconds = time % 60;
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondeLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function resetCountDown() {
        clearTimeout(countDownTimeout);
        setIsActive(false)
        setTime(0.1*60);
    }

    function startCountDown(){
        setIsActive(true);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(()=>{
                setTime(time - 1);
            }, 1000)
        } else if(isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondeLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinished ? (
                <button disabled
                type="button" className={styles.countdownButton} >
                Ciclo encerrado
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountDown}>
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button type="button" className={styles.countdownButton} onClick={startCountDown}>
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}
            
            

            
        </div>
        
    );
}