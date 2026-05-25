import React from 'react';
import { ChevronLeft, Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LibrarySeatBooking() {
    const navigate = useNavigate()

    const readingRooms = [
        { id: 6, name: '메인스퀘어', total: 60, used: 22, floor: '2F' },
        { id: 1, name: '제1자유열람실A', total: 158, used: 11, floor: '2F' },
        { id: 2, name: '제1자유열람실B', total: 132, used: 11, floor: '2F' },
        { id: 4, name: '제2자유열람실A', total: 112, used: 9, floor: '4F' },
        { id: 5, name: '제2자유열람실B', total: 93, used: 24, floor: '4F' },
        { id: 3, name: '대학원 열람실', total: 60, used: 1, floor: '4F' },
    ];

    return (
        <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-lg relative flex flex-col font-sans select-none">

            {/* 헤더 */}
            <header className="bg-[#3b5998] text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 cursor-pointer">
                    <ChevronLeft className="w-6 h-6" />
                    <h1 className="text-lg font-bold tracking-tight">좌석 예약/발권</h1>
                </div>
                <Home className="w-5 h-5 cursor-pointer" />
            </header>

            {/* 열람실 목록 */}
            <main className="flex-1 bg-white">
                {readingRooms.map((room) => {
                    const radius = 24;
                    const circumference = 2 * Math.PI * radius;
                    const percentage = (room.used / room.total) * 100;
                    const strokeDashoffset = circumference - (percentage / 100) * circumference;
                    const remaining = room.total - room.used;

                    const is2F = room.floor === '2F';
                    const floorColor = is2F ? 'text-[#4a72cc] bg-[#eef2fb]' : 'text-[#e07b3a] bg-[#fff3eb]';

                    return (
                        <div
                            key={room.id}
                            onClick={() => {
                                if (room.name.includes('제1자유열람실')) {
                                    navigate('/seatmap')
                                }
                            }}
                            className={`flex items-center justify-between px-5 py-5 border-b border-gray-100 transition-colors ${room.name.includes('제1자유열람실')
                                    ? 'hover:bg-gray-50 active:bg-gray-100 cursor-pointer'
                                    : 'cursor-default'
                                }`}
                        >
                            {/* 원형 프로그레스 바 */}
                            <div className="flex items-center gap-5">
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="32" cy="32" r={radius} className="stroke-gray-100" strokeWidth="4" fill="transparent" />
                                        <circle
                                            cx="32" cy="32" r={radius}
                                            className="stroke-[#54a3e4]"
                                            strokeWidth="4" fill="transparent"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-[11px] font-medium tracking-tighter">
                                        <span className="text-[#4ca3e4] font-bold">{room.used}</span>
                                        <span className="text-gray-300 mx-[1px]">/</span>
                                        <span className="text-gray-400">{room.total}</span>
                                    </div>
                                </div>

                                {/* 이름 + 층 뱃지 + 잔여좌석 */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-[16px] font-semibold text-gray-800 tracking-tight">
                                            {room.name}
                                        </h2>
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${floorColor}`}>
                                            {room.floor}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-gray-400 font-medium">
                                        잔여좌석 : <span className="text-gray-500 font-semibold">{remaining}</span>
                                    </p>
                                </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    );
                })}
            </main>

            {/* MY 플로팅 버튼 */}
            <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#4a72cc] text-white rounded-full shadow-md flex items-center justify-center font-bold text-lg italic hover:bg-[#3b5998] active:scale-95 transition-all">
                MY
            </button>

        </div>
    );
}