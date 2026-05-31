import { useNavigate } from 'react-router-dom'

const rooms = [
    { name: "메인스퀘어", floor: "2F", current: 55, total: 60, remain: 5, color: "#e53935", path: null },
    { name: "제1자유열람실", floor: "2F", current: 35, total: 290, remain: 255, color: "#4a90e2", path: '/seatmap' },
    { name: "제2자유열람실", floor: "4F", current: 99, total: 205, remain: 106, color: "#22c55e", path: '/seatmap2' },
    { name: "대학원 열람실", floor: "4F", current: 1, total: 60, remain: 59, color: "#4a90e2", path: null },
]

function ProgressCircle({ current, total, color, size = 90 }) {
    const radius = (size / 2) - 8
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - current / total)
    const cx = size / 2
    const cy = size / 2

    return (
        <div className="progress-circle" style={{ position: 'relative', width: size, height: size, flexShrink: 0, marginRight: '24px' }}>
            <svg width={size} height={size}>
                <circle cx={cx} cy={cy} r={radius} stroke="#eeeeee" strokeWidth="6" fill="none" />
                <circle
                    cx={cx} cy={cy} r={radius}
                    stroke={color} strokeWidth="6" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${cx} ${cy})`}
                />
            </svg>
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '11px', textAlign: 'center', color: '#555', lineHeight: 1.3
            }}>
                <span style={{ color, fontWeight: 700 }}>{current}</span>/{total}
            </div>
        </div>
    )
}

export default function LibrarySeatBooking() {
    const navigate = useNavigate()

    return (
        <div className="seat-page">
            <div className="seat-header">
                <span onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '24px' }}>←</span>
                <h2>좌석 예약/발권</h2>
                <span onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '24px' }}>⌂</span>
            </div>

            <div className="crowd-card">
                <ProgressCircle current={642} total={900} color="orange" size={120} />
                <div className="crowd-center">
                    <div className="title-row">
                        <h3>도서관 전체 혼잡도</h3>
                        <span className="badge">보통</span>
                    </div>
                    <p>전체 좌석 수 : 900석</p>
                    <p>예상 잔여좌석 : <span className="orange">258석</span></p>
                    <p className="update">⊙ 실시간 기준 | 11:23 업데이트</p>
                </div>
                <div className="crowd-right">
                    <div style={{ fontSize: '28px' }}>👥</div>
                    <p style={{ fontSize: '11px' }}>현재 이용자</p>
                    <strong className="orange">642명</strong>
                </div>
            </div>

            <div className="legend">
                <span>🔵 여유 (0~30%)</span>
                <span>🟢 보통 (31~60%)</span>
                <span>🟠 혼잡 (61~90%)</span>
                <span>🔴 매우 혼잡 (91~100%)</span>
            </div>

            <div className="room-list">
                {rooms.map((room) => (
                    <div
                        className="room-card"
                        key={room.name}
                        onClick={() => room.path && navigate(room.path)}
                        style={{ cursor: room.path ? 'pointer' : 'default' }}
                    >
                        <ProgressCircle current={room.current} total={room.total} color={room.color} size={70} />
                        <div className="room-info">
                            <div className="room-title">
                                <h4>{room.name}</h4>
                                <span className="floor">{room.floor}</span>
                            </div>
                            <p>잔여좌석 : <strong>{room.remain}</strong></p>
                        </div>
                        <div className="arrow">›</div>
                    </div>
                ))}
            </div>

            <button className="my-floating-btn">MY</button>
        </div>
    )
}