"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Nav from '../../components/nav';

export default function InputPage() {
    const router = useRouter();
    const [grade, setGrade] = useState('');
    const [classNm, setClassNm] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedDate = date.replaceAll('-', '');

        router.push(`/schoolplan/result?grade=${grade}&classNm=${classNm}&date=${formattedDate}`);
    };

    return (
        <div>
            <Nav />
            <h1 className="text-2xl font-bold mb-4">학교 시간표를 확인해보세요!</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="학년"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 transition"
                />
                <input
                    type="text"
                    placeholder="반"
                    value={classNm}
                    onChange={(e) => setClassNm(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 transition"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    시간표 조회
                </button>
            </form>
        </div>
    );
}
