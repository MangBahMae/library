import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import seatMapImg from '../assets/floor_4.png'

const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']

function generateSeats(col) {
    return Array.from({ length: 6 }, (_, i) => ({
        id: `${col}${i + 1}`,
        available: Math.random() > 0.4
    }))
}

export default function SeatMap2() {
    const navigate = useNavigate()

    // 좌석배치도 드래그
    const containerRef = useRef(null)

    // 열 선택 드래그
    const colScrollRef = useRef(null)

    const [selectedCol, setSelectedCol] = useState(null)

    const [seats] = useState(() => {
        const map = {}
        columns.forEach(col => {
            map[col] = generateSeats(col)
        })
        return map
    })

    // 좌석배치도 드래그
    const isDown = useRef(false)
    const startX = useRef(0)
    const scrollLeftRef = useRef(0)

    const handleMouseDown = (e) => {
        isDown.current = true
        startX.current = e.pageX - containerRef.current.offsetLeft
        scrollLeftRef.current = containerRef.current.scrollLeft
    }

    const handleMouseLeave = () => {
        isDown.current = false
    }

    const handleMouseUp = () => {
        isDown.current = false
    }

    const handleMouseMove = (e) => {
        if (!isDown.current) return

        e.preventDefault()

        const x = e.pageX - containerRef.current.offsetLeft
        const walk = x - startX.current

        containerRef.current.scrollLeft =
            scrollLeftRef.current - walk * 1.5
    }

    // 열 선택 드래그
    const colIsDown = useRef(false)
    const colStartX = useRef(0)
    const colScrollLeft = useRef(0)

    const handleColMouseDown = (e) => {
        colIsDown.current = true
        colStartX.current = e.pageX
        colScrollLeft.current = colScrollRef.current.scrollLeft
    }

    const handleColMouseLeave = () => {
        colIsDown.current = false
    }

    const handleColMouseUp = () => {
        colIsDown.current = false
    }

    const handleColMouseMove = (e) => {
        if (!colIsDown.current) return

        e.preventDefault()

        const walk = e.pageX - colStartX.current

        colScrollRef.current.scrollLeft =
            colScrollLeft.current - walk
    }

    return (
        <div
            style={{
                maxWidth: '412px',
                minHeight: '100dvh',
                margin: '0 auto',
                background: '#f2f3f7',
                fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
            }}
        >
            {/* 헤더 */}
            <div
                style={{
                    background: '#1a3a6b',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <span
                    onClick={() => navigate(-1)}
                    style={{
                        color: 'white',
                        fontSize: 22,
                        cursor: 'pointer'
                    }}
                >
                    ‹
                </span>

                <span
                    style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 600
                    }}
                >
                    좌석 예약/발권
                </span>

                <span
                    onClick={() => navigate('/')}
                    style={{
                        color: 'white',
                        fontSize: 20,
                        cursor: 'pointer'
                    }}
                >
                    ⌂
                </span>
            </div>

            {/* 상태바 */}
            <div
                style={{
                    background: '#1a3a6b',
                    padding: '5px 14px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                <span
                    style={{
                        color: 'white',
                        fontSize: 13
                    }}
                >
                    4F 제2자유열람실
                </span>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        fontSize: 12,
                        color: 'white'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5
                        }}
                    >
                        <span>사용가능</span>
                        <div
                            style={{
                                width: 26,
                                height: 4,
                                borderRadius: 2,
                                background: '#4a90d9'
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5
                        }}
                    >
                        <span>사용중</span>
                        <div
                            style={{
                                width: 26,
                                height: 4,
                                borderRadius: 2,
                                background: '#aaa'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* 좌석 배치도 */}
            <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    cursor: 'grab',
                    background: 'white'
                }}
            >
                <img
                    src={seatMapImg}
                    alt="4층 좌석 배치도"
                    draggable={false}
                    style={{
                        display: 'block',
                        height: 500,
                        width: 'auto',
                        maxWidth: 'none',
                        userSelect: 'none'
                    }}
                />
            </div>

            {/* 열 선택 */}
            <div
                style={{
                    margin: '12px',
                    background: 'white',
                    borderRadius: '12px',
                    padding: '14px'
                }}
            >
                <p
                    style={{
                        fontSize: '13px',
                        color: '#555',
                        marginBottom: '10px'
                    }}
                >
                    열 선택
                </p>

                <div
                    ref={colScrollRef}
                    onMouseDown={handleColMouseDown}
                    onMouseLeave={handleColMouseLeave}
                    onMouseUp={handleColMouseUp}
                    onMouseMove={handleColMouseMove}
                    style={{
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        cursor: 'grab',
                        userSelect: 'none'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            width: 'max-content',
                            flexWrap: 'nowrap'
                        }}
                    >
                        {columns.map(col => (
                            <button
                                key={col}
                                onClick={() => setSelectedCol(col)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    background:
                                        selectedCol === col
                                            ? '#1a3a6b'
                                            : '#f1f1f1',
                                    color:
                                        selectedCol === col
                                            ? 'white'
                                            : '#333',
                                    transition: '0.2s',
                                    flexShrink: 0
                                }}
                            >
                                {col}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 예약 가능 좌석 */}
            {selectedCol && (
                <div
                    style={{
                        margin: '0 12px 24px',
                        background: 'white',
                        borderRadius: '12px',
                        padding: '16px'
                    }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            color: '#555',
                            marginBottom: '12px'
                        }}
                    >
                        {selectedCol}열 예약 가능 좌석
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px'
                        }}
                    >
                        {seats[selectedCol].filter(s => s.available).length === 0 ? (
                            <p
                                style={{
                                    fontSize: '13px',
                                    color: '#aaa'
                                }}
                            >
                                예약 가능한 좌석이 없습니다.
                            </p>
                        ) : (
                            seats[selectedCol]
                                .filter(s => s.available)
                                .map(seat => (
                                    <div
                                        key={seat.id}
                                        style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            background: '#e8f5e9',
                                            color: '#2e7d32',
                                            border: '1.5px solid #81c784'
                                        }}
                                    >
                                        {seat.id}
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}