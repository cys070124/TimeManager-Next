import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link href="/timer">타이머</Link>
                </li>
                <li>
                    <Link href="/stopwatch">스톱워치</Link>
                </li>
                <li>
                    <Link href="/planner">일일 플래너</Link>
                </li>
                <li>
                    <Link href="/schoolplan/input">학교 시간표</Link>
                </li>
            </ul>
        </nav>
    );
}
