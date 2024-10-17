"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Nav from '../../components/nav';

export default function ResultPage() {
    const searchParams = useSearchParams();
    const grade = searchParams.get('grade');
    const classNm = searchParams.get('classNm');
    const date = searchParams.get('date');

    const [timetable, setTimetable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            const url = 'https://open.neis.go.kr/hub/hisTimetable';
            const params = new URLSearchParams({
                KEY: '8ae0a934462a4511a5ac3cadff5aca9c',
                Type: 'json',
                pIndex: '1',
                pSize: '100',
                ATPT_OFCDC_SC_CODE: 'C10',
                SD_SCHUL_CODE: '7150658',
                GRADE: grade,
                CLRM_NM: classNm,
                ALL_TI_YMD: date,
            });

            try {
                const response = await fetch(`${url}?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('네트워크 응답이 정상적이지 않습니다.');
                }
                const data = await response.json();
                setTimetable(data);
            } catch (error) {
                console.error('API 호출 실패:', error);
                setError('API 호출 실패');
            } finally {
                setLoading(false);
            }
        };

        if (grade && classNm && date) {
            fetchTimetable();
        }
    }, [grade, classNm, date]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    const rows = timetable?.hisTimetable[1].row || [];

    // 데이터 X
    if (!rows.length) return <p>시간표 데이터가 없습니다.</p>;

    return (
        <div>
            <Nav />
            <h1 className="text-2xl font-bold mb-4">학교 시간표를 확인해보세요!</h1>
            <table className="timetable">
                <thead>
                    <tr>
                        <th className="text-2xl font-bold">교시</th>
                        <th className="text-2xl font-bold">과목명</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) => (
                        <tr key={index}>
                            <td className="text-2xl font-bold">{item.PERIO}</td> {}
                            <td className="text-2xl font-bold">{item.ITRT_CNTNT}</td> {}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

