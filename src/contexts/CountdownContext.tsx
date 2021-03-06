import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

let countDownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void,
    resetCountDown: () => void,
}

interface CountdonwProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({  } as CountdownContextData);

export function CountdownProvider({ children }: CountdonwProviderProps) {
   
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] =useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function resetCountDown() {
        clearTimeout(countDownTimeout);
        setIsActive(false)
        setTime(25*60);
        setHasFinished(false);
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

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}