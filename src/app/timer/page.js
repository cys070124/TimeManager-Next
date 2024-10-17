"use client";

import { useState, useRef } from 'react';
import Nav from '../components/nav';

export default function Timer() {
    const [time, setTime] = useState(0);
    const timerIdRef = useRef(null);
    const [inputHour, setInputHour] = useState(0);
    const [inputMinute, setInputMinute] = useState(0);
    const [inputSecond, setInputSecond] = useState(0);

    let hour = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = time % 60;

    const getTimeFormatString = () => {
        return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const printTime = () => {
        setTime((prevTime) => {
            if (prevTime > 0) {
                return prevTime - 1;
            } else {
                stopTimer(); //중지
                return 0;
            }
        });
    };

    const startTimer = () => {
        stopTimer();
        const totalSeconds = (inputHour * 3600) + (inputMinute * 60) + inputSecond;
        setTime(totalSeconds);
        timerIdRef.current = setInterval(printTime, 1000);
    };

    const stopTimer = () => {
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        setTime(0);
        setInputHour(0);
        setInputMinute(0);
        setInputSecond(0);
    };

    return (
        <div>
            <Nav />
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-4xl font-bold">타이머</p>
                    <p>타이머 기능을 이용해보세요</p>
                    <div className="mb-4">
                        <input 
                            type="number" 
                            min="0" 
                            value={inputHour} 
                            onChange={(e) => setInputHour(Number(e.target.value))} 
                            className="border border-gray-400 px-2 py-1 rounded mb-2"
                            placeholder="시간 (시)"
                        />
                        <input 
                            type="number" 
                            min="0" 
                            value={inputMinute} 
                            onChange={(e) => setInputMinute(Number(e.target.value))} 
                            className="border border-gray-400 px-2 py-1 rounded mb-2"
                            placeholder="분"
                        />
                        <input 
                            type="number" 
                            min="0" 
                            value={inputSecond} 
                            onChange={(e) => setInputSecond(Number(e.target.value))} 
                            className="border border-gray-400 px-2 py-1 rounded mb-2"
                            placeholder="초"
                        />
                    </div>
                    <p id="timer" className="text-8xl">{getTimeFormatString()}</p>
                    <div>
                        <button onClick={startTimer} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">start</button>
                        <button onClick={stopTimer} className="bg-red-500 text-white px-4 py-2 rounded mr-2">stop</button>
                        <button onClick={resetTimer} className="bg-black text-white px-4 py-2 rounded mr-2">reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
