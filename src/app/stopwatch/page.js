"use client"; // Client Component로 설정

import { useState, useRef } from 'react';
import Nav from '../components/nav';

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const timerIdRef = useRef(null);
    let hour = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = time % 60;

    const getTimeFormatString = () => {
        return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const printTime = () => {
        setTime((prevTime) => prevTime + 1);
    };

    const startClock = () => {
        stopClock();
        timerIdRef.current = setInterval(printTime, 1000);
    };

    const stopClock = () => {
        if (timerIdRef.current) {
          clearInterval(timerIdRef.current);
          timerIdRef.current = null;
        }
    };

    const resetClock = () => {
        stopClock();
        setTime(0);
    };
    return (
        <div>
            <Nav />
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-4xl font-bold">Stopwatch</p>
                    <p>스톱워치 기능을 이용해보세요</p>
                    <p id="stopwatch" className="text-8xl">{getTimeFormatString()}</p>
                    <div>
                        <button onClick={startClock} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">start</button>
                        <button onClick={stopClock} className="bg-red-500 text-white px-4 py-2 rounded mr-2">stop</button>
                        <button onClick={resetClock} className="bg-black text-white px-4 py-2 rounded mr-2">reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}