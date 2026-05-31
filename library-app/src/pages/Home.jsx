import { useNavigate } from 'react-router-dom'
import {
    MdChair, MdEventSeat, MdMenuBook,
    MdPeople, MdTabletMac, MdSearch,
    MdLocalLibrary, MdMap, MdSettings
} from 'react-icons/md'

const menus = [
    { label: '나의 자리', icon: <MdChair />, path: null },
    { label: '좌석 예약/발권', icon: <MdEventSeat />, path: '/booking' },
    { label: '도서셀프대출', icon: <MdMenuBook />, path: null },
    { label: '세미나실 예약', icon: <MdPeople />, path: null },
    { label: '전자책', icon: <MdTabletMac />, path: null },
    { label: '자료검색', icon: <MdSearch />, path: null },
    { label: 'My Library', icon: <MdLocalLibrary />, path: null },
    { label: '약도', icon: <MdMap />, path: '/floormap' },
    { label: '설정', icon: <MdSettings />, path: null },
]

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="app">
            {/* 상단 헤더 */}
            <div className="header">
                <div className="overlay">
                    <h2>가톨릭대학교 중앙도서관</h2>
                    <div className="card">
                        <div className="info">
                            <div className="row">
                                <span>이름</span>
                                <strong>홍길동</strong>
                            </div>
                            <div className="row">
                                <span>소속</span>
                                <strong>ICT공학계열</strong>
                            </div>
                            <div className="row">
                                <span>학번</span>
                                <strong>202200000</strong>
                            </div>
                        </div>
                        <div className="qr-box" />
                    </div>
                </div>
            </div>

            {/* 메뉴 그리드 */}
            <div className="menu-grid">
                {menus.map((menu) => (
                    <div
                        className="menu-card"
                        key={menu.label}
                        onClick={() => menu.path && navigate(menu.path)}
                        style={{ cursor: menu.path ? 'pointer' : 'default' }}
                    >
                        <div className="icon">{menu.icon}</div>
                        <p>{menu.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}