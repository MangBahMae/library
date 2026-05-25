import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LibrarySeatBooking from './pages/LibrarySeatBooking'
import SeatMap from './pages/SeatMap'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LibrarySeatBooking />} />
        <Route path="/seatmap" element={<SeatMap />} />
      </Routes>
    </BrowserRouter>
  )
}