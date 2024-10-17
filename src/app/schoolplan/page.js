"use client";

import { useState, useEffect } from 'react';

export default function Timetable() {
    const [timetable, setTimetable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            const url = 'https://open.neis.go.kr/hub/hisTimetable';

            const params = new URLSearchParams({
                KEY: '8ae0a934462a4511a5ac3cadff5aca9c', // 인증키
                Type: 'json',                            // 응답 형식
                pIndex: '1',                             // 페이지 인덱스
                pSize: '100',                            // 페이지당 데이터 수
                ATPT_OFCDC_SC_CODE: 'C10',              // 시도 교육청 코드
                SD_SCHUL_CODE: '7150658',               // 학교 코드
                GRADE: '2',                              // 학년
                CLRM_NM: '',                            // 반
                ALL_TI_YMD: '20241017'                  // 날짜
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

        fetchTimetable();
    }, []); // 컴포넌트가 마운트될 때 한번 호출

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>고등학교 시간표</h1>
            <pre>{JSON.stringify(timetable, null, 2)}</pre>
            {/* 시간표 데이터를 렌더링할 수 있습니다 */}
        </div>
    );
}
