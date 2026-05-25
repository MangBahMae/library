import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import seatMapImg from '../assets/seat_map.png'

export default function SeatMap() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  let isDown = false
  let startX = 0
  let scrollLeft = 0

  const handleMouseDown = (e) => {
    isDown = true
    startX = e.pageX - containerRef.current.offsetLeft
    scrollLeft = containerRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    isDown = false
  }

  const handleMouseUp = () => {
    isDown = false
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    containerRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5
  }

  return (
    <div style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", background: 'white', minHeight: '100vh' }}>

      <div style={{ background: '#1a3a6b', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span onClick={() => navigate(-1)} style={{ color: 'white', fontSize: 22, fontWeight: 300, cursor: 'pointer' }}>‹</span>
        <span style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>좌석 예약/발권</span>
        <span style={{ color: 'white', fontSize: 20 }}>⌂</span>
      </div>

      <div style={{ background: '#1a3a6b', padding: '5px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <span style={{ color: 'white', fontSize: 13 }}>2F 제1자유열람실A+B</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span>사용가능</span>
            <div style={{ width: 26, height: 4, borderRadius: 2, background: '#4a90d9' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span>사용중</span>
            <div style={{ width: 26, height: 4, borderRadius: 2, background: '#aaa' }} />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ overflowX: 'auto', overflowY: 'hidden', WebkitOverflowScrolling: 'touch', cursor: 'grab', background: 'white' }}
      >
        <img
          src={seatMapImg}
          alt="좌석 배치도"
          draggable={false}
          style={{ display: 'block', height: 340, width: 'auto', maxWidth: 'none', userSelect: 'none' }}
        />
      </div>

      <div style={{ height: '50vh', background: 'white' }} />

      <a
        href="https://library.catholic.ac.kr/webcontent/info/57"
        target="_blank"
        rel="noreferrer"
        style={{ position: 'fixed', bottom: 32, right: 20, width: 52, height: 52, borderRadius: '50%', background: '#1a3a6b', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(0,0,0,0.3)', textDecoration: 'none' }}
      >
        <svg viewBox="0 0 24 24" style={{ width: 26, height: 26, fill: 'white' }}>
          <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
        </svg>
      </a>

    </div>
  )
}