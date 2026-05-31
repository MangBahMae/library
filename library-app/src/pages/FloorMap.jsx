import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import floorMap from '../assets/KakaoTalk_3.png'

const floors = [1, 2, 3, 4, 5]

export default function FloorMap() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)

    return (
        <div className="seat-page">
            <div className="seat-header">
                <span onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '24px' }}>←</span>
                <h2>약도</h2>
                <span></span>
            </div>

            <div style={{ padding: '20px 16px' }}>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>층을 선택하세요</p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                    {floors.map((floor) => (
                        <button
                            key={floor}
                            onClick={() => setSelected(floor)}
                            style={{
                                flex: 1,
                                height: '48px',
                                borderRadius: '12px',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                background: selected === floor ? '#2048a4' : 'white',
                                color: selected === floor ? 'white' : '#333',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                transition: '0.2s'
                            }}
                        >
                            {floor}층
                        </button>
                    ))}
                </div>

                {selected === 2 && (
                    <div style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'white',
                        padding: '16px'
                    }}>
                        <img
                            src={floorMap}
                            alt="2층 약도"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                )}

                {selected !== null && selected !== 2 && (
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '40px',
                        textAlign: 'center', color: '#999', fontSize: '14px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                        {selected}층 약도는 준비 중입니다.
                    </div>
                )}
            </div>
        </div>
    )
}