import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LibrarySeatBooking from './pages/LibrarySeatBooking'
import SeatMap from './pages/SeatMap'
import SeatMap2 from './pages/SeatMap2'
import FloorMap from './pages/FloorMap'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<LibrarySeatBooking />} />
        <Route path="/seatmap" element={<SeatMap />} />
        <Route path="/seatmap2" element={<SeatMap2 />} />
        <Route path="/floormap" element={<FloorMap />} />
      </Routes>
    </BrowserRouter>
  )
}